const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.number');
const deleteButton = document.querySelector('.erase');

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        screen.textContent += number.classList[2];
    })
})

deleteButton.addEventListener('click', () => {
    screen.textContent = screen.textContent.slice(0, -1);
})