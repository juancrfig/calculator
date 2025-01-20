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

let leftNumber = 0;
let rightNumber = 0;
let currentOperator = '';
let screenValue = '';




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
    }
}


numbers.forEach( number => {
    number.addEventListener('click', () => {
        screenValue += number.classList[2];
        screen.textContent = screenValue;
    })
})

operators.forEach( operator => {

    const operatorSymbol = operator.classList[3] 
    operator.addEventListener('click', () => {

        if (!leftNumber) {
            leftNumber = screenValue;
            currentOperator = operatorSymbol;
            screenValue = '';
            screen.textContent = '';    
        } else if (!rightNumber && operatorSymbol === '=') {
            rightNumber = screenValue;
            const result = operate(Number(leftNumber), currentOperator, Number(rightNumber));
            console.log(result)
            screen.textContent = String(result);
            currentOperator = '';
            screenValue = String(result);
        }
        else if (leftNumber &&  rightNumber && operator.classList[3] === '=') {
            console.log()
        }
        
    })
})

deleteButton.addEventListener('click', () => {
    screenValue = '';
    screen.textContent = '';
})

