const remove = (arr, ...args) => {  // функция удаления из массива по индексам
    let set = new Set(args);
    return arr.filter((v, k) => !set.has(k));
};
let numsForFunc = (detailsFirst, detailsSecond) => { // функция формирование элементов для для функции
    let arrayForFunc = [detailsFirst[0]];
    let maxForFunc = arrayForFunc[0];
    let minusForFunc = detailsSecond[0];

    for(let i=1; i<detailsFirst.length; i++){
        maxForFunc += detailsFirst[i];
        let doneMax = maxForFunc - minusForFunc;
        arrayForFunc.push(doneMax);
        minusForFunc += detailsSecond[i];
    }

    return arrayForFunc;
};
const detailsDistribution = (detailsArray, firstMachine, secondMachine) => { // функция распределения
    for(let key in detailsArray){
        firstMachine.push(detailsArray[key][0]);
        secondMachine.push(detailsArray[key][1]);
    }
};
let funcForSingleMachine = (arrayOfDetails, R) => {
    let arrayForFunc = [arrayOfDetails[0]];
    for(let key=1; key < arrayOfDetails.length; key++) {
        let maxForFunc = lastElInArray(arrayForFunc) + arrayOfDetails[key];
        arrayForFunc.push(maxForFunc);
        maxForFunc = 0;
    }

    return arrayForFunc.map(value => {
        let k = value - R;
        if (k < 0) {
            k = 0
        }
        return k;
    }).reduce((first, second) => first + second);
};
const errorDet = () => console.error("Что-то не так с массивом деталей...");
const lastElInArray = array => array[array.length-1];

//let allDetails = [[8, 2], [7, 8], [5, 4], [5, 5], [3, 5], [5, 6], [8, 7], [8, 7]]; // выборка деталей
//let allDetails = [[8, 2, 8], [7, 8, 9], [5, 4, 4], [5, 5, 6], [3, 5, 9], [5, 6, 3], [8, 7, 6], [8, 7, 6]]; // выборка деталей
let allDetails = [8, 7, 5, 5, 3, 5, 8, 8];
let R = 18;
let allDetailsLength = allDetails[0].length;

if(allDetails.length > 1){
    if(allDetailsLength >= 4){
        errorDet();
    }
    else {
        if (allDetailsLength >= 2) {
            if (allDetailsLength === 3) {
                console.log("Порядок до преобразования:");
                console.log(allDetails);

                let arrayOfSumDetails = [];
                for (let key in allDetails) {
                    let firstDet = allDetails[key][0] + allDetails[key][1];
                    let secondDet = allDetails[key][1] + allDetails[key][2];
                    arrayOfSumDetails.push([firstDet, secondDet])
                }
                allDetails = arrayOfSumDetails;
            }
            let detailsOfFirstMachine = [], detailsOfSecondMachine = [], firstOptima = [], secondOptima = [];

            detailsDistribution(allDetails, detailsOfFirstMachine, detailsOfSecondMachine); // распределяем по разным массивам
            let func = Math.max.apply(null, numsForFunc(detailsOfFirstMachine, detailsOfSecondMachine)); // считаем функцию

            console.log("Обычный порядок: ");
            console.log(allDetails);
            console.log("F(p) =", func);

            while (detailsOfFirstMachine.length !== 0 || detailsOfSecondMachine.length !== 0) {  // формируем оптимальный порядок
                let a = Math.min.apply(null, detailsOfFirstMachine);
                let b = Math.min.apply(null, detailsOfSecondMachine);
                if (a < b) {
                    let x = detailsOfFirstMachine.indexOf(a);
                    firstOptima.push([detailsOfFirstMachine[x], detailsOfSecondMachine[x]]);
                    detailsOfSecondMachine = remove(detailsOfSecondMachine, x);
                    detailsOfFirstMachine = remove(detailsOfFirstMachine, x);
                }
                else {
                    let y = detailsOfSecondMachine.indexOf(b);
                    secondOptima.unshift([detailsOfFirstMachine[y], detailsOfSecondMachine[y]]);
                    detailsOfSecondMachine = remove(detailsOfSecondMachine, y);
                    detailsOfFirstMachine = remove(detailsOfFirstMachine, y);
                }
            }

            for (let key in secondOptima) {  // пушим в единый массив
                firstOptima.push(secondOptima[key])
            }

            detailsDistribution(firstOptima, detailsOfFirstMachine, detailsOfSecondMachine); // распределяем по массивам детали
            func = Math.max.apply(null, numsForFunc(detailsOfFirstMachine, detailsOfSecondMachine)); // считаем функцию

            console.log("Оптимальный порядок: ");
            console.log(firstOptima);
            console.log("F(p) =", func);

        }
        if (allDetailsLength === undefined) {
            let func = funcForSingleMachine(allDetails, R);
            console.log("Обычный порядок: ");
            console.log(allDetails);
            console.log("F(p) =", func);

            let sortDetails = allDetails.sort();
            func = funcForSingleMachine(sortDetails, R);
            console.log("Обычный порядок: ");
            console.log(sortDetails);
            console.log("F(p) =", func);
        }
    }
} else{
    errorDet();
}



