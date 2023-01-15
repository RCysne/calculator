'use strict'

// Variáveis dos elementos HTML

const display = document.getElementById('display')
const numbers = document.querySelectorAll('[id*="key"]')
const operators = document.querySelectorAll('[id*="operator"]')
// console.log(numbers);

// Quando for um primeiro número no display, ele altera para cada novo número digitado e não concatena. Mas se não for um novo número ele concatena. Após apertar um operador, ele guarda na memória e zera o display
let firstNumber = true

// Variáveis de armazenamento dos números digitados e operações;
let lastNumber
let operator

// ----------------- CALCULATION ----------------

// Lógica para verificar se existe operador digitado antes de uma operação
const pendingOperation = () => operator !== undefined

// Lógica do cálculo verificando se tem operador, armazenando o número atual, escolhendo a operação e consultando primeiro número digitado para poder fazer o cálculo.
const calculation = () => {
  // Antes de calcular tem que verificar se tem alguma operação pendente
  if (pendingOperation()) {
    // CurrentNumber é o valor atual digitado no display
    const currentNumber = Number(display.innerText)
    // Para atualizar a tela e não repetir o último número digitado eu
    firstNumber = true

    // Eval substitui todos os ifs
    const result = eval(`${lastNumber}${operator}${currentNumber}`)
    console.log(result)
    updateDisplay(result)
    // if (operator === '+') {
    //   updateDisplay(lastNumber + currentNumber)
    //   console.log(lastNumber, currentNumber)
    // } else if (operator === '-') {
    //   updateDisplay(lastNumber - currentNumber)
    // } else if (operator === '*') {
    //   updateDisplay(lastNumber * currentNumber)
    // } else if (operator === '/') {
    //   updateDisplay(lastNumber / currentNumber)
    // }
  }
}

// 3 Lógica para concatenar ou não quando os números forem digitados
const updateDisplay = numberValue => {
  if (firstNumber) {
    display.innerText = numberValue
    firstNumber = false
  } else {
    display.innerText += numberValue
  }
}

// ----------------- NUMBERS ----------------

// 2 Apresenta o número clicado no display
const insertNumber = event => updateDisplay(event.target.value)

// 1 Em números, para cada número clicado, executa a função insertNumber();
numbers.forEach(number => number.addEventListener('click', insertNumber))

// ----------------- OPERATORS ----------------

//5 Console dos operadores clicados
const selectOperator = event => {
  calculation()
  // Só vai aceitar operador depois que houver um novo número digitado
  if (!firstNumber) {
    // Quando clicar no operador, ele passa a trocar o número novamente no display
    firstNumber = true
    // Pego o operador digitado
    operator = event.target.value
    // Em vez de pegar o valor do event, eu pego o valor completo que foi digitado no display e transformo em número para poder fazer o cálculo
    lastNumber = Number(display.innerText)
  }
}

// 4 Em cada operador clicado dos operadores, executa a função selectOperator
operators.forEach(operator =>
  operator.addEventListener('click', selectOperator)
)

const equalActivate = () => {
  // Se chamar o calculation diretamente no click, ele continua com os operadores e o igual funcionando, então é preciso anular essa ação.
  calculation()
  operator = undefined
}

document.querySelector('#equal').addEventListener('click', equalActivate)
document.getElementById('clean-display').addEventListener('click', () => {
  display.innerText = ''
})

document.getElementById('clean-calc').addEventListener('click', () => {
  display.innerText = ''
  operator = undefined
  firstNumber = true
  lastNumber = undefined
})

document.getElementById('backspace').addEventListener('click', () => {
  display.innerText = display.innerText.slice(0, -1)
})
