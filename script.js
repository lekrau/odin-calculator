"use strict";

// FUNCTIONS
const add = (summand1, summand2) => {
    const sum = summand1 + summand2;
    return sum;
};

const subtract = (minuend, subtrahend) => {
    const difference = minuend - subtrahend;
    return difference;
};

const multiply = (factor1, factor2) => {
    const product = factor1 * factor2;
    return product;
}

const divide = (dividend, divisor) => {
    const quotient = dividend / divisor;
    return quotient;
}

const operate = (operator, number1, number2) => {
    const value1 = +number1;
    const value2 = +number2;
    switch (operator) {
        case "+":
            return (add(value1, value2));
        case "-":
            return (subtract(value1, value2));
        case "*":
            return (multiply(value1, value2));
        case "/":
            return (divide(value1, value2));
        default:
            return operator(value1, value2);
    }
}

const processClicks = event => {
    const target = event.target;
    const targetClass = target.classList[0];
    const targetValue = target.textContent;
    switch (targetClass) {
        case "digit":
            if (operator === "") {
                number1 += targetValue;
                updateDisplay(number1);
            } else {
                number2 += targetValue;
                updateDisplay(number2);
            }
            break;
        case "operator":
            operator = targetValue;
            break;
        case "equal-sign":
            updateDisplay(operate(operator, number1, number2));
            number1 = "";
            number2 = "";
            operator = "";
            break;
        case "clear":
            break;
        default:
            console.log(target);
            break;
    }
}

const updateDisplay = value => {
    const display = document.querySelector(".display");
    display.textContent = value;
}

// DECLARATIONS

let number1 = "";
let number2 = "";
let operator = "";

// MAIN

document.addEventListener("click", processClicks);

// Short Debug Log
// What went wrong, if anything?
// Which assumption was tested or confirmed?
// What did I change or learn?