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



// ACTIVATE EVENT LISTENERS FOR KEYBOARD IN ALL THE DOCUMENT

document.addEventListener('keydown', (e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {clearScreen()}
    if (e.key === '0') { screen.textContent += '0'}
    if (e.key === '1') { screen.textContent += '1'}
    if (e.key === '2') { screen.textContent += '2'}
    if (e.key === '3') { screen.textContent += '3'}
    if (e.key === '4') { screen.textContent += '4'}
    if (e.key === '5') { screen.textContent += '5'}
    if (e.key === '6') { screen.textContent += '6'}
    if (e.key === '7') { screen.textContent += '7'}
    if (e.key === '8') { screen.textContent += '8'}
    if (e.key === '9') { screen.textContent += '9'}
    if (e.key === '+') { screen.textContent += '+'}
    if (e.key === '-') { screen.textContent += '-'}
    if (e.key === '*') { screen.textContent += '*'}
    if (e.key === '/') { screen.textContent += '/'}
    if (e.key === 'Enter') { }
})


// LOGIC FOR CLEANING THE SCREEN

function clearScreen() {
    screen.textContent = '';
}

deleteButton.addEventListener('click', clearScreen);


// ADD CLICK EVENT LISTENER TO NUMBERS 

numbersElms.forEach( numberElm => {
    const number = numberElm.classList[2]; 
    numberElm.addEventListener('click', () => {
        screen.textContent += number;
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

function checkInput() {
    console.clear()
    let inputValue = screen.textContent;

    const leftAndIndex = [...takeLeftNumber(inputValue)];

    const leftNumber = leftAndIndex[0]; 
    const operator = leftAndIndex[1];

    const slideIndex = leftAndIndex[2] + 1;
    const rightNumberAndNextOperator = [...takeNumberRight(inputValue, slideIndex)];

    const rightNumber = rightNumberAndNextOperator[0];
    const nextOperator = rightNumberAndNextOperator[1];

    
    console.log(`RightNumber: ${rightNumber} and NextOperator: ${nextOperator}`)
}

function takeLeftNumber(stringInScreen) {

    let leftNumber = '';
    let slideIndex = null;
    let operator = null;

    for (char of stringInScreen) {
        if (!isNaN(char)) {
            leftNumber += char;
        } else {
            slideIndex = stringInScreen.indexOf(char);
            operator = stringInScreen[slideIndex];
            break;
        }
    }
    return [leftNumber, operator, slideIndex];
}

function takeNumberRight(stringInScreen, slideIndex) {
    
    let rightNumber = '';
    const rightSide = stringInScreen.slice(slideIndex);
    let nextOperator = null;

    for (char of rightSide) {
        if (!isNaN(char)) {
            rightNumber += char;
        } else {
            nextOperator = char;
            break;
        }
    }
    return [rightNumber, nextOperator];
}