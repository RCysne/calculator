'use strict'

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*="key"]');
// console.log(numbers);

const updateDisplay = ((numberValue) => {
  display.innerText += numberValue;
})

const insertNumber = ((event) => updateDisplay(event.target.value));


// Em números, para cada número clicado, executa a função insertNumber();
numbers.forEach(number => number.addEventListener('click', insertNumber));
