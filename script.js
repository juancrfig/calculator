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
    operationWhappening = false;
    console.clear();
    for (op of operatorsElms) {
            op.classList.remove('pressed')
        } 
    }

deleteButton.addEventListener('click', clearScreen);


// ADD CLICK EVENT LISTENER TO NUMBERS 

numbersElms.forEach( numberElm => {
    const number = numberElm.classList[2]; 
    numberElm.addEventListener('click', (e) => {

        if (e.target.closest('.number').classList.contains('0') && !screen.textContent) {
            console.log('First number cannot be  zero, jackass!');
        } else {
            console.log('adding number to screen')
            screen.textContent += number;
        }
    })
})

// ADD CLICK EVENT LISTENER TO OPERATORS

operatorsElms.forEach( operatorElm => {
    const operator = operatorElm.classList[3];
    operatorElm.addEventListener('click', (e) => {
        if (e.target.closest('.operator').classList.contains('=')) {
        } else if (!screen.textContent) {
        } else {
            currentOperator = operator;
        }
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

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

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
let operationWhappening = false;

function checkInput(e) {


    let equalSignClick = false;
    try {
        equalSignClick = e.target.closest('.operator').classList.contains('=');
    } catch (TypeError) {
    }
    
    if ( (e.key === '=' || equalSignClick) && leftNumber && rightNumber) {
        console.clear()
        console.log('operating equal sign')
        result = operate(leftNumber, currentOperator, rightNumber);
        screen.textContent = result;
        leftNumber = result;
        rightNumber = null;
        currentOperator = null;
        operationWhappening = true;
    } else if ( (e.target.closest('.operator') || arrayOperators.includes(e.key) ) && currentOperator && leftNumber) {
        for (op of operatorsElms) {
            op.classList.remove('pressed')
            if (op.classList.contains(e.key)) {
                op.classList.add('pressed')
            } 
        }
        if (!operationWhappening) {
            rightNumber = screen.textContent;
            result = operate(leftNumber, currentOperator, rightNumber);
            screen.textContent = result;
            leftNumber = result;
            rightNumber = null;
            operationWhappening = true;
        } else {
            console.clear()
            screen.textContent = '';
            operationWhappening = false;

            result = operate(leftNumber, currentOperator, rightNumber);
            screen.textContent = result;
            leftNumber = result;
            rightNumber = null;
        }

    } else if (currentOperator && leftNumber && operationWhappening) {
        screen.textContent = '';

    } else if (currentOperator && leftNumber) {
        console.clear()
        console.log('assigning right number')
        rightNumber = screen.textContent;
    } else if (currentOperator && !screen.textContent) {
        console.clear()
        console.log('First enter a number idiot!');
    } else if (!leftNumber && currentOperator && !screen.textContent) {
        console.clear()
        console.log('Nice attempt to mess around!')
    } else if (!leftNumber && currentOperator && screen.textContent) {
        console.log('assigning left number')
        leftNumber = screen.textContent;
        screen.textContent = '';
    }
}
