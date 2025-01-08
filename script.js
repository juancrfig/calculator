const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.number');

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        screen.textContent += number.classList[2];
    })
})
