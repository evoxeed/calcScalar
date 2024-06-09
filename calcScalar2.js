const x1 = 1 / 2;
const x2 = 1 / 3;
const n1 = 21;
const n2 = 14;
const u = Number.EPSILON / 2;
console.log(Number.EPSILON);

function createElementsVector(x, n) {
    const elementsArr = []; // массив для хранения элементов ряда
    elementsArr[0] = x;
    const z = x * x;
    for (let i = 1; i < n + 1; i++) {
        elementsArr[i] = elementsArr[i - 1] * z; //Заполнение массива элементов ряда
    }

    return elementsArr;
}

function createCoefficientVector(n) {
    const coefficientArr = []; // массив для хранения коофициентов
    coefficientArr[0] = 1;
    let sign = -1;
    for (let i = 1; i < n + 1; i++) {
        coefficientArr[i] = sign / (2 * i + 1); // выбор знака и заполнение массива коофициентов
        sign = -sign;
    }
    return coefficientArr;
}

//Функция для вычисления скалярного произведения
function calcScalar(elementsVector, coefficientVector) {
    if (elementsVector.length !== coefficientVector.length) {
        throw new Error('Векторы должны иметь одинаковую длину');
    }
    let nu = 0;
    let s = 0;
    let scl = 0;


    for (let i = 0; i < elementsVector.length - 1; i++) {
        scl = elementsVector[i] * coefficientVector[i]; //Скалярное произведение
        s += scl; //Рекурсивное сложение
        nu += Math.abs(s) + Math.abs(scl); //Оценка погрешности вычислений
    }
    
    nu *= calculateErrorEstimate(elementsVector.length - 1, nu) //Оценка погрешности от оценки погрешности вычислений

    const m = Math.abs(elementsVector[elementsVector.length - 1] * coefficientVector[coefficientVector.length - 1]); //последний элемент
    const err = calculateErrorEstimate((elementsVector.length - 1) * 4 - 3, m); //оценка погрешности последнего элемента

    return [s, nu, err];
}

function calculateErrorEstimate(k, scl) {
    // todo обратить внимание на знак scl!
    return Math.abs(scl) / (1 - k * u);
}

//Вызов функций
const elementVectorAlpha = createElementsVector(x1, n1);
const coefficientVectorAlpha = createCoefficientVector(n1);
const alpha = calcScalar(elementVectorAlpha, coefficientVectorAlpha);
console.log(alpha);

const elementVectorBeta = createElementsVector(x2, n2);
const coefficientVectorBeta = createCoefficientVector(n2);
const beta = calcScalar(elementVectorBeta, coefficientVectorBeta);
console.log(beta);

//Сумма alpha и beta
const sumAlphaBeta = alpha[0] + beta[0];
console.log(sumAlphaBeta);

//Cуммарная ошибка
let sumErr = alpha[1] + alpha[2] + beta[1] + beta[2];
console.log(sumErr);

//Отклонение (бесконечно) точного скалярного произведения от (бесконечно) точного значения скалярного произведения приближённых векторов;
if (sumAlphaBeta < sumAlphaBeta + sumErr && sumAlphaBeta > sumAlphaBeta - sumErr) {
    console.log('Входит в промежуток');
} else {
    console.log('Не входит в промежуток');
}




