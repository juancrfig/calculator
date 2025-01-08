const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.number');
const deleteButton = document.querySelector('.erase');
const addButton = document.querySelector('.addition');
const subButton = document.querySelector('.substraction');
const multButton = document.querySelector('.multiplication');
const divButton = document.querySelector('.division');
const arrayOperators = ['+', '-', '*', '÷']

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
        screen.textContent+= '+';
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
        screen.textContent+= '-';
    };
})

multButton.addEventListener('click', () => {
    if (checkForOperators()) {
    } else {
        screen.textContent+= '×';
    };
})

divButton.addEventListener('click', () => {
    if (checkForOperators()) {
    } else {
        screen.textContent+= '÷';
    };
})