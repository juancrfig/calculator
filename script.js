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
let input = '';


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
    const digit = number.classList[2];
    number.addEventListener('click', () => {
        input += digit;
        console.log(input)
    })
})

operators.forEach( operator => {

    const enteredOperator = operator.classList[3];
    operator.addEventListener('click', () => {
        input += enteredOperator;
        console.log(input)
    })
})

deleteButton.addEventListener('click', () => {
    resetValues();
})


