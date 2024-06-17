//коэффициент
const coefficient = 20/3
const x1 = 1/33;
const x2 = 16/17;
const n1 = 4;
const n2 = 198;
const u = Number.EPSILON / 2;

//Функция создания вектора с элементами (x,x^3,x^5, ... , )
function createElementsVector(x, n) {
    const elementsArr = []; // массив для хранения элементов ряда
    elementsArr[0] = x;
    const z = x * x;

    for (let i = 1; i < n + 1; i++) {
        elementsArr[i] = elementsArr[i - 1] * z; //Заполнение массива элементов ряда
    }

    return elementsArr;
}

//Функция создания вектора с коофициентами (1, -1/3, 1/5, ... , )
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

//Функция вычисления скалярного произведения и погрешности вычислений
function calcScalarAndErrorEstimate(elementsVector, coefficientVector) {
    if (elementsVector.length !== coefficientVector.length) {
        throw new Error('Векторы должны иметь одинаковую длину');
    }
    let nu = 0;
    let s = 0;
    let scl = 0;
    const n = elementsVector.length - 1;

    for (let i = 0; i < n; i++) {
        scl = elementsVector[i] * coefficientVector[i]; //Скалярное произведение b и a
        s += scl; //Рекурсивное сложение
        nu += Math.abs(s) + Math.abs(scl); //Оценка погрешности вычислений
    }
    nu *= u
    nu /= (1 - (2 * (n) + 1) * u) //Оценка погрешности от оценки погрешности вычислений

    return [s, nu];
}

//Функция вычисления модуля скалярного произведения и погрешности вычислений
function calcModulScalarAndErrorEstimate(elementsVector, coefficientVector) {
    if (elementsVector.length !== coefficientVector.length) {
        throw new Error('Векторы должны иметь одинаковую длину');
    }
    let nuModul = 0;
    let s1 = 0;
    let sclModul = 0;
    let cx = 0;
    const n = elementsVector.length - 1;

    for (let i = 0; i < n; i++) {
        sclModul = Math.abs(elementsVector[i]) * Math.abs(coefficientVector[i]);
        s1 += sclModul;
        nuModul += Math.abs(s1) + Math.abs(sclModul);
    }
    nuModul *= u
    nuModul /= (1 - (2 * (n) + 1) * u)
    cx = (s1 + nuModul) * gamma((4 * n) - 2) // |cx - c^x^|

    return cx;
}

function gamma(n) {
    return (n * u) / (1 - n * u)
}

function lastElementErorr(elementsVector, coefficientVector) {
    const n = elementsVector.length - 1;
    const m = Math.abs(elementsVector[n] * coefficientVector[n]); //последний элемент
    return err = Math.abs(m) / (1 - ((n * 4) - 1) * u); //оценка погрешности последнего элемента
    //(n*4) - 1 - кол-во округлений при подсчете коофициентов и иксов
}

//Вызов функций
const elementVectorAlpha = createElementsVector(x1, n1); // создание вектора элементов
const coefficientVectorAlpha = createCoefficientVector(n1); // создание вектора коофициентов
const alpha = calcScalarAndErrorEstimate(elementVectorAlpha, coefficientVectorAlpha); // вычисление скалярного произведения и оценка вычислений
const alphaSumError = calcModulScalarAndErrorEstimate(elementVectorAlpha, coefficientVectorAlpha); //оценка суммы
const lastAlphaElementErr = lastElementErorr(elementVectorAlpha, coefficientVectorAlpha); //оценка остатка

const elementVectorBeta = createElementsVector(x2, n2);
const coefficientVectorBeta = createCoefficientVector(n2);
const beta = calcScalarAndErrorEstimate(elementVectorBeta, coefficientVectorBeta);
const betaSumError = calcModulScalarAndErrorEstimate(elementVectorBeta, coefficientVectorBeta);
const lastBetaElementErr = lastElementErorr(elementVectorBeta, coefficientVectorBeta);

function estimationAmountErrors() {
    let nu = 0;
    let s = 0;
    const n = errors.length;
    for (let i = 0; i < n; i++) {
        s += errors[i];
        nu += Math.abs(s);
    }
    nu *= u
    nu /= (1 - (n + 1) * u)
    return [s, nu];
}

//Сумма alpha и beta
const sumAlphaBeta = alpha[0] + beta[0];
console.log("P/4 = ", sumAlphaBeta);

//Cуммарная ошибка и оценка ошибки
const errors = [alpha[1], alphaSumError, lastAlphaElementErr, beta[1], betaSumError, lastBetaElementErr];
const estimationAmountErrors1 = (estimationAmountErrors()[0] + estimationAmountErrors()[1]) / (1 - 2 *u);
console.log(estimationAmountErrors1)

const answerSum = coefficient * sumAlphaBeta;
const answerErr = coefficient * estimationAmountErrors1;

console.log(answerSum);
console.log(answerErr);

if (Math.pow(10, -12) > answerErr) {
    console.log("Получившиеся ошибка укладывается в заданный уровень погрешности")
} else {
    console.log("Получившиеся ошибка не укладывается в заданный уровень погрешности")
}
