const factorial = number => number ? number * factorial(number - 1) : 1;
const typeError = () => console.error("Укажите правильный тип СМО...");
const numOfChannelError = () => console.error("Укажите правильное количество каналов...");
const lastElInArray = array => array[array.length-1];

let queuingSystemModel = {                       // ТИПЫ:
    type: "qs-with-queue",                    // qs-with-failures -  СМО с отказами, channels > 1 - многоканальная, channel = 1 - одноканальная.
    channels: 6,                                 // qs-with-queue - СМО с очередью, меняется channels (>=1) и queue (>0).
    queue: 1,
    callFlow: 0.5,
    serviceTime: 1.2
};

let serviceIntensity = 1 / queuingSystemModel.serviceTime; // интенсивность сервиса
let mainAttitude = queuingSystemModel.callFlow / serviceIntensity; // отношение потока вызовов к интенсивности

let probabilityOfFailure, probabilityOfService, absoluteBandwidth, averageNumberOfBusyChannels, otherProbability = [], anotherProbability, arrayOfAttitudes = [];
let mainProbability = 1;  // P0

let type = queuingSystemModel.type; // просто кинули тип в переменную для удобства

if(queuingSystemModel.channels === 1){
    if(type === "qs-with-failures"){
        mainProbability += mainAttitude; // плюсуем P
        mainProbability = Math.pow(mainProbability, -1); // считаем P0
        anotherProbability = 1 - mainProbability; // P1

        probabilityOfFailure = anotherProbability; // вероятность отказа
        probabilityOfService = 1 - probabilityOfFailure;  // вероятность обслуживания
        absoluteBandwidth = queuingSystemModel.callFlow * probabilityOfService; // абсолютная пропускная способность

        console.log("Одноканальное СМО с отказами.");
        console.log("Вероятность отказа: " + probabilityOfFailure + ".");
        console.log("Вероятность обслуживания: " + probabilityOfService + ".");
        console.log("Абсолютная пропускная способность: " + absoluteBandwidth + ".");
    }
    else if(type === "qs-with-queue"){
        for(let i=1; i <= queuingSystemModel.queue + 1; i++){
            mainProbability += Math.pow(mainAttitude, i);  // в цикле по queue (очередь) возводим P в степень m+1
        }

        mainProbability = Math.pow(mainProbability, -1);

        for(let i=1; i <= queuingSystemModel.queue + 1; i++) {
            anotherProbability = Math.pow(mainAttitude, i) * mainProbability;
            otherProbability.push(anotherProbability)
        }

        probabilityOfFailure = lastElInArray(otherProbability); // вероятность отказа
        probabilityOfService = 1 - probabilityOfFailure;  // вероятность обслуживания
        absoluteBandwidth = queuingSystemModel.callFlow * probabilityOfService; // абсолютная пропускная способность

        console.log("Одноканальное СМО с очередью.");
        console.log("Вероятность отказа: " + probabilityOfFailure + ".");
        console.log("Вероятность обслуживания: " + probabilityOfService + ".");
        console.log("Абсолютная пропускная способность: " + absoluteBandwidth + ".");
    }
    else{
        typeError();
    }
}
else if(queuingSystemModel.channels > 1){
    if(type === "qs-with-failures"){
        for(let i=1; i <= queuingSystemModel.channels; i++) {
            let attitudeToFactorial = Math.pow(mainAttitude, i) / factorial(i);     // возводим в степень и делим на факториал
            arrayOfAttitudes.push(attitudeToFactorial);                             // пушим в массив отношений mainAttitude к факториалам
        }

        let sumOfAttitudes = arrayOfAttitudes.reduce((firstValue, secondValue) => firstValue + secondValue); // складываем отношения к факториалам
        mainProbability = Math.pow((mainProbability + sumOfAttitudes), -1); // вовзодим в степень -1
        otherProbability = arrayOfAttitudes.map(value => value * mainProbability); // считаем вероятностные параметры

        probabilityOfFailure = lastElInArray(otherProbability); // вероятность отказа
        probabilityOfService = 1 - probabilityOfFailure;  // вероятность обслуживания
        absoluteBandwidth = queuingSystemModel.callFlow * probabilityOfService; // абсолютная пропускная способность
        averageNumberOfBusyChannels = mainAttitude * probabilityOfService; // среднее число занятых каналов

        console.log("Многоканальное СМО с отказами.");
        console.log("Вероятность отказа: " + probabilityOfFailure + ".");
        console.log("Вероятность обслуживания: " + probabilityOfService + ".");
        console.log("Абсолютная пропускная способность: " + absoluteBandwidth + ".");
        console.log("Среднее число занятых каналов: " + averageNumberOfBusyChannels + ".");
    }
    else if(type === "qs-with-queue"){
        let arrayOfAttitudesToChannel = [], mulAtt;
        for(let i=1; i <= queuingSystemModel.channels; i++) {
            let attitudeToFactorial = Math.pow(mainAttitude, i) / factorial(i);     // возводим в степень и делим на факториал

            if(i !== queuingSystemModel.channels){
                arrayOfAttitudes.push(attitudeToFactorial);                         // пушим в массив отношений mainAttitude к факториалам
            }
            else{
                mulAtt = attitudeToFactorial;
            }

            let attitudeToChannels = Math.pow(mainAttitude, i) / Math.pow(i, i);
            arrayOfAttitudesToChannel.push(attitudeToChannels);
        }

        let sumOfAttitudes = arrayOfAttitudes.reduce((firstValue, secondValue) => firstValue + secondValue); // сумма отношений факториалов
        let sumOfAttitudesToChannel = arrayOfAttitudesToChannel.reduce((firstValue, secondValue) => firstValue + secondValue); // сумма отношений каналам в степени
        mainProbability = Math.pow((mainProbability + sumOfAttitudes + sumOfAttitudesToChannel + mulAtt), -1); // находим P0

        otherProbability = arrayOfAttitudes.map(value => value * mainProbability); // считаем вероятностные параметры

        let nPlusM = queuingSystemModel.channels + queuingSystemModel.queue;

        probabilityOfFailure = (Math.pow(mainAttitude, nPlusM) /
            (Math.pow(queuingSystemModel.channels, queuingSystemModel.queue) * factorial(queuingSystemModel.channels)))
            * mainProbability; // вероятность отказа
        probabilityOfService = 1 - probabilityOfFailure;  // вероятность обслуживания
        absoluteBandwidth = queuingSystemModel.callFlow * probabilityOfService; // абсолютная пропускная способность

        console.log("Многоканальное СМО с очередью.");
        console.log("Вероятность отказа: " + probabilityOfFailure + ".");
        console.log("Вероятность обслуживания: " + probabilityOfService + ".");
        console.log("Абсолютная пропускная способность: " + absoluteBandwidth + ".");
    }
    else{
        typeError()
    }
}
else{
    numOfChannelError();
}
