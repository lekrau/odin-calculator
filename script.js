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
};

const divide = (dividend, divisor) => {
    if(divisor === 0) {
        return "Error";
    } else {
        const quotient = dividend / divisor;
        return quotient;
    }
};

const operate = (operator, value1, value2) => {
    value1 = +value1;
    value2 = +value2;
    switch (operator) {
        case "+":
            result = (add(value1, value2));
            break;
        case "-":
            result =  (subtract(value1, value2));
            break;
        case "*":
            result =  (multiply(value1, value2));
            break;
        case "/":
            result =  (divide(value1, value2));
            break;
        default:
            result = "Error";
            alert("Chose an operator");
            break;
    }
    updateDisplay(result);
    number1 = "";
    number2 = "";
    return result;
};

const processClicks = event => {
    const target = event.target;
    const targetClass = target.classList[0];
    const targetValue = target.textContent;
    switch (targetClass) {
        case "digit":
            clickDigit(targetValue);
            break;
        case "operator":
            clickOperator(targetValue);
            break;
        case "equal-sign":
            clickEqual();
            break;
        case "clear":
            clear();
            break;
        default:
            console.log(target);
            break;
    }
    console.log("targetValue", targetValue);
};

const clickDigit = targetValue => {
    if (operator === "") {
        number1 += targetValue;
        updateDisplay(number1);
    } else {
        number2 += targetValue;
        updateDisplay(number2);
    }
};

const clickOperator = targetValue => {
    if (operator !== "") {
        operate(operator, number1, number2);
        number1 = result;
    }
    operator = targetValue;
};


const clickEqual = () => {
    if (number1 === "") {
        alert("Not ready to calculate. Let's start fresh.")
        clear();
    } else {
        operate(operator, number1, number2);
        operator = "";
    }
};

const updateDisplay = value => {
    const display = document.querySelector(".display");
    display.textContent = value;
};

const clear = () => {
    number1 = "";
    number2 = "";
    result = undefined;
    operator = "";
    updateDisplay("-");
};


// DECLARATIONS
let number1 = "";
let number2 = "";
let result;
let operator = "";

// MAIN
document.addEventListener("click", processClicks);

// Short Debug Log
// What went wrong, if anything?
// Which assumption was tested or confirmed?
// What did I change or learn?