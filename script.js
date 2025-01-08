const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.number');
const deleteButton = document.querySelector('.erase');
const addButton = document.querySelector('.addition');
const subButton = document.querySelector('.substraction');
const multButton = document.querySelector('.multiplication');
const divButton = document.querySelector('.division');
const arrayOperators = ['+', '-', '*', '÷']
let leftNumber = '';
let rightNumber = '';
let operator = '';

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        screen.textContent += number.classList[2];
    })
})

deleteButton.addEventListener('click', () => {
    screen.textContent = screen.textContent.slice(0, -1);
})

addButton.addEventListener('click', () => {
    if (checkForOperators()) {
    } else {
        changeVariables('+');
    };
})

function checkForOperators() {
    const length = screen.textContent.length;
    if (arrayOperators.includes(screen.textContent[length -1])) {
        return true;
    } else if (screen.textContent === '') {
        return true
    } else {
        return false;
    }
}

subButton.addEventListener('click', () => {
    if (checkForOperators()) {
    } else {
        changeVariables('-');
    };
})

multButton.addEventListener('click', () => {
    if (checkForOperators()) {
    } else {
        changeVariables('*');
    }
})

divButton.addEventListener('click', () => {
    if (checkForOperators()) {
    } else {
        changeVariables('/');
    };
})


function changeVariables(operatorTyped) {

    
    if (operator === '') {
        leftNumber = screen.textContent;
        operator = operatorTyped;
        screen.textContent = '';
        console.log(`The left number is ${leftNumber}`)
    } else if (leftNumber) {
        rightNumber = screen.textContent;
        console.log(`The right number is ${rightNumber}`)
    }
    console.log(`The operator is ${operatorTyped}`)

}