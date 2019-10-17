const endOfGraph = (model) => {  // находим конец графа
    let arrTo = [];
    model.forEach(elem => arrTo.push(elem.to));
    return Math.max.apply(null, arrTo);
};

const startOfGraph = (model) => {  // находим конец графа
    let arrTo = [];
    model.forEach(elem => arrTo.push(elem.from));
    return Math.min.apply(null, arrTo);
};

const minLength = (tops) => {
    for(let key in tops){
        if (tops.hasOwnProperty(key)) {
            let arrForLength = [];
            if (tops[key].length > 1) {
                tops[key].forEach(elem => arrForLength.push(elem.length));
                let indexMinLength = arrForLength.indexOf(Math.min.apply(null, arrForLength));
                tops[key] = [tops[key][indexMinLength]];
            }
        }
    }
};

const searchMinWay = (tops, minTop, maxTop) => {
    let minWay = [];
    minWay.push(String(minTop));
    do{

        let key = String(allTops[minTop][0].to);
        minTop = key;
        minWay.push(key)

    } while(minTop !== String(maxTop));

    return minWay;
};

class storeLines {  // класс для массива для быстрого формирования данных по графу
    constructor(from, to, length) {
        this.from = from;
        this.to = to;
        this.length = length;
    }
}

class obrStoreLines {  // класс для массива для быстрого формирования данных по графу
    constructor(length, to) {
        this.length = length;
        this.to = to;
    }
}

let graphModel = [];
graphModel.push(new storeLines(0, 1, 4));
graphModel.push(new storeLines(0, 3, 5));
graphModel.push(new storeLines(0, 2, 3));
graphModel.push(new storeLines(1, 4, 3));
graphModel.push(new storeLines(3, 4, 2));
graphModel.push(new storeLines(1, 3, 4));
graphModel.push(new storeLines(2, 3, 3));
graphModel.push(new storeLines(2, 5, 6));
graphModel.push(new storeLines(3, 5, 3));
graphModel.push(new storeLines(3, 6, 4));
graphModel.push(new storeLines(5, 6, 2));
graphModel.push(new storeLines(4, 6, 1));

let maxTo = endOfGraph(graphModel); // счетчик вершин, определяет конец графа
let maxTop = maxTo;
let minFrom = startOfGraph(graphModel);

let allTops = {};
for(let i=minFrom; i<maxTo; i++){ // пушим по счетчику объект всех вершин
    allTops[String(i)] = []
}

graphModel.forEach(elem => {
    if(elem.to === maxTo){
        allTops[String(elem.from)].push(new obrStoreLines(elem.length, elem.to)) // первоначальный подсчет из последней вершины
    }
});

maxTo--; // уменьшаем на один счетчик вершин

do {
    graphModel.forEach(elem => {
        if (elem.to === maxTo) {
            allTops[String(elem.to)].forEach(key =>
                allTops[String(elem.from)].push(new obrStoreLines((elem.length + key.length), elem.to))  // считаем все вершины в цикле
            )
        }
    });

    maxTo--;
    minLength(allTops); // берем только минимальную длину
} while(maxTo !== minFrom);

let minWay = searchMinWay(allTops, minFrom, maxTop);  // находим минимальный путь

console.log(allTops);
console.log(minWay);

