$(document).ready(() => {    
    const keys = $('.calculator-keys');
    keys.on('click', (event) => {
        const {target} = event;
        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            updateDisplay();
            return;
        }
    
        if (target.classList.contains('decimal')) {
            inputDecimal(target.value);            
            updateDisplay();
            return;
        }
    
        if (target.classList.contains('all-clear')) {
            resetCalculator(target.value);
            updateDisplay()
            return;
        }
        inputDigit(target.value);
        updateDisplay();
    })
    updateDisplay();
});

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

updateDisplay = () => {
    const display = $('.calculator-screen');
    display.val(calculator.displayValue);
};
inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}
inputDecimal = (dot) => {
    if (calculator.waitingForSecondOperand === true) return;

    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
}
handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    'sqrt': (firstOperand, secondOperand) => Math.sqrt(secondOperand),
    
    'x2': (firstOperand, secondOperand) => Math.pow(secondOperand, 2),

    '=': (firstOperand, secondOperand) => secondOperand
};
resetCalculator = () => {   
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}