const calculatorElm = document.querySelector('.calculator-box')
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

let currentOperator = null;

// ACTIVATE EVENT LISTENERS FOR KEYBOARD IN ALL THE DOCUMENT

document.addEventListener('keydown', (e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {clearScreen()}
    if (e.key === '0') {
        if (screen.textContent === '') {
            console.log('First number cannot be  zero, jackass!');
        } else {
            screen.textContent += '0'
        }
    }
    if (e.key === '1') { screen.textContent += '1'}
    if (e.key === '2') { screen.textContent += '2'}
    if (e.key === '3') { screen.textContent += '3'}
    if (e.key === '4') { screen.textContent += '4'}
    if (e.key === '5') { screen.textContent += '5'}
    if (e.key === '6') { screen.textContent += '6'}
    if (e.key === '7') { screen.textContent += '7'}
    if (e.key === '8') { screen.textContent += '8'}
    if (e.key === '9') { screen.textContent += '9'}
    if (e.key === '+') { currentOperator = '+'}
    if (e.key === '-') { currentOperator = '-'}
    if (e.key === '*') { currentOperator = '*'}
    if (e.key === '/') { currentOperator = '/'}
})


// LOGIC FOR CLEANING THE SCREEN

function clearScreen() {
    screen.textContent = '';
    currentOperator = null;
    leftNumber = null;
    rightNumber = null;
    console.clear();
}

deleteButton.addEventListener('click', clearScreen);


// ADD CLICK EVENT LISTENER TO NUMBERS 

numbersElms.forEach( numberElm => {
    const number = numberElm.classList[2]; 
    numberElm.addEventListener('click', () => {
        screen.textContent += number;
    })
})

// ADD CLICK EVENT LISTENER TO OPERATORS

operatorsElms.forEach( operatorElm => {
    const operator = operatorElm.classList[3];
    operatorElm.addEventListener('click', () => {
        currentOperator = operator;
    })
})

//  CALCULATOR FUNCTIONS

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
            return false;
    }
}

// ADD CHECK INPUT FUNCTIONALITY

calculatorElm.addEventListener('click', checkInput);
document.addEventListener('keydown', checkInput);

let leftNumber = null;
let rightNumber = null;
let nextOperator = null;
let operationReady = false;
let result = null;

function checkInput(e) {

    if ( (e.key === '=' || e.target.closest('.operator').classList[3] === '=') && leftNumber && rightNumber) {
        console.log('operating equal sign')
        console.log(currentOperator)
        result = operate(leftNumber, currentOperator, rightNumber);
        screen.textContent = result;
        leftNumber = result;
        rightNumber = null;
        currentOperator = null;
    }

    if ( (e.target.closest('.operator') || arrayOperators.includes(e.key) ) && currentOperator && leftNumber) {
        rightNumber = screen.textContent;
        result = operate(leftNumber, currentOperator, rightNumber);
        screen.textContent = result;
        leftNumber = result;
    } else if (currentOperator && leftNumber) {
        rightNumber = screen.textContent;
    } else if (!leftNumber && currentOperator) {
        leftNumber = screen.textContent;
        screen.textContent = '';
    } else if (e.target.closest('.operator') && currentOperator && leftNumber && rightNumber) {
        console.log('gotcha3!');
    }
}