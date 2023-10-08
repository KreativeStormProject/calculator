let displayValue = '0';
let firstOperand = null;
let result = null;
let awaitingSecondOperand = false;
let operator = null;



const add = (x, y) => {
    return x + y
}
const subtract = (x, y) => {
    return x - y
}
const divide = (x, y) => {
    if (y===0){
        return 'haha IMPOSSIBLE!!!'
    }
   else {
    return x / y
   } 
}
const multiply = (x, y) => {
    return x * y
}
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

function updateDisplay() {
    display.textContent = displayValue;
}

function clear() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    awaitingSecondOperand = false;
}

function inputDigit(digit) {
    if (awaitingSecondOperand) {
        displayValue = digit;
        awaitingSecondOperand = false;
    } else {
        displayValue === '0' ? (displayValue = digit) : (displayValue += digit);
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && awaitingSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(firstOperand, inputValue, operator);
        displayValue = result.toString();
        firstOperand = result;
    }

    operator = nextOperator;
    awaitingSecondOperand = true;
}

function operate(a, b, op) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return b;
    }
}

function handleBackspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.value;

        if (buttonValue === "clear") {
            clear();
            updateDisplay();
        } else if (buttonValue === "=") {
            handleOperator(buttonValue);
            updateDisplay();
        } else if (button.classList.contains("operator")) {
            handleOperator(buttonValue);
            updateDisplay();
        } else if (buttonValue === ".") {
            inputDecimal();
            updateDisplay();
        } else if (buttonValue === "backspace") {
            handleBackspace();
            updateDisplay();
        } else {
            inputDigit(buttonValue);
            updateDisplay();
        }
    });
});


document.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            inputDigit(key);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            handleOperator(key);
            break;
        case "Enter":
            handleOperator("=");
            break;
        case "Escape":
            clear();
            break;
        case "Backspace":
        case "Delete":
            handleBackspace();
            break;
        default:

    }

    updateDisplay();
});

