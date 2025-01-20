const screen = document.querySelector('.screen');
const numbersElms = document.querySelectorAll('.number');
const numbers = [...numbersElms];

const operatorsElms = document.querySelectorAll('.operator');
const operators = [...operatorsElms];

const deleteButton = document.querySelector('.erase');
const addButton = document.querySelector('.addition');
const subButton = document.querySelector('.substraction');
const multButton = document.querySelector('.multiplication');
const divButton = document.querySelector('.division');
const arrayOperators = ['+', '-', '*', '/']

let leftNumber = null;
let rightNumber = null;
let currentOperator = null;
let screenValue = '';

let flag = false;
let numberInDisplay = false;


//  CALCULATION FUNCTIONS

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {

    if (secondNumber === 0) {
        alert('Division by zero is not defined in maths!');
    } else {
        return firstNumber / secondNumber
    }
}

function operate(firstNumber, operator, secondNumber) {

    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            alert('Ingresa un operador válido!');
            return false;
    }
}


numbers.forEach( number => {
    number.addEventListener('click', () => {

        if (flag) {
            resetValues()
        }
        screenValue += number.classList[2];
        screen.textContent = screenValue;
        numberInDisplay = true;
    })
})

operators.forEach( operator => {

    const enteredOperator = operator.classList[3];
    let result = 0;
    operator.addEventListener('click', () => {

        if (!numberInDisplay && leftNumber === null) {
            console.log('Try first to enter a number, jackass :p')
        } else if (numberInDisplay && !leftNumber) {
            leftNumber = screenValue;
            currentOperator = enteredOperator;
            screen.textContent = '';
            screenValue = '';
            numberInDisplay = false;
        } else if (leftNumber != null && currentOperator != null ) {
            currentOperator = enteredOperator;
        }

        console.log(`Left number was ${leftNumber}`)
        // console.log(`Right number was ${rightNumber}`)
        console.log(`currentOperator was ${currentOperator}`)
    })
})

function prepareNextCalculation(result) {
    leftNumber = result;
    rightNumber = 0;
    screen.textContent = String(result);
    currentOperator = '';
    screenValue = 0;
    flag = true;
}

deleteButton.addEventListener('click', () => {
    resetValues();
})

function resetValues() {
    screenValue = '';
    screen.textContent = '';
    rightNumber = null;
    leftNumber = null;
    currentOperator = '';
    flag = false;
}

