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
        // TODO: Status resetten, sodass user nicht mit Error als Ergebnis weiter rechnen kann
        return "Error: Division by 0";
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
            result = "Error: Unknown";
            break;
    }
    updateDisplay(result);
    number1 = "";
    number2 = "";
    return result;
};

const processClicks = event => {
    // console.log("number1:", number1);
    // console.log("typeof number1:", typeof number1);
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
            clickClear();
            break;
        case "decimal-separator":
            clickDecimalSeparator(targetValue);
            break;
        case "backspace":
            clickBackspace();
            break;
        default:
            console.log(target);
            break;
    }
    // console.log("targetValue:", targetValue);
    // console.log("number1:", number1);
    // console.log("typeof number1:", typeof number1);
    // console.log("getStatus():", getStatus());
};

const clickDigit = targetValue => {
    if (status.noFirstNumberYet) {
        number1 = targetValue;
        updateDisplay(number1);
        status.noFirstNumberYet = false;
        status.firstNumberAvailable = true;
    } else if (status.firstNumberAvailable) {
        number1 += targetValue;
        updateDisplay(number1);
    } else if (status.firstNumberAndOperatorAvailable) {
        number2 = targetValue;
        updateDisplay(number2);
        status.firstNumberAndOperatorAvailable = false;
        status.expressionIsComplete = true;
    } else if (status.expressionIsComplete) {
        number2 += targetValue;
        updateDisplay(number2);
    } else if (status.resultAvailable) {
        number1 = targetValue;
        updateDisplay(number1);
        status.firstNumberAvailable = true;
        status.resultAvailable = false;
    }
};

const clickOperator = targetValue => {
    if (status.noFirstNumberYet) {
        updateDisplay("Enter a number first");
    } else if (status.firstNumberAvailable) {
        operator = targetValue;
        status.firstNumberAndOperatorAvailable = true;
        status.firstNumberAvailable = false;
    } else if (status.firstNumberAndOperatorAvailable) {
        operator = targetValue;
    } else if (status.expressionIsComplete) {
        updateDisplay(operate(operator, number1, number2));
        if (isNaN(result)) {
            status.noFirstNumberYet = true;
        } else {
            operator = targetValue;
            number1 = result;
            number2 = "";
            result = null;
        }
        status.firstNumberAndOperatorAvailable = true;
        status.expressionIsComplete = false;
    } else if (status.resultAvailable) {
        operator = targetValue;
        number1 = result;
        number2 = "";
        result = null;
        status.firstNumberAndOperatorAvailable = true;
        status.resultAvailable = false;
    }
};

const clickEqual = () => {
    if (status.noFirstNumberYet) {
        updateDisplay("Enter a number first");
    } else if (status.firstNumberAvailable) {
        updateDisplay("Enter an operator first");
    } else if (status.firstNumberAndOperatorAvailable) {
        updateDisplay("Enter the second number first");
    } else if (status.expressionIsComplete) {
        updateDisplay(operate(operator, number1, number2));
        if (isNaN(result)) {
            status.noFirstNumberYet = true;
        } else {
            status.resultAvailable = true;
        }
        status.expressionIsComplete = false;
    } else if (status.resultAvailable) {
        updateDisplay("Enter a new number or operator");
    }
};

const clickDecimalSeparator = targetValue => {
     if (status.noFirstNumberYet) {
        number1 = "0" + targetValue;
        updateDisplay(number1);
        status.noFirstNumberYet = false;
        status.firstNumberAvailable = true;
    } else if (status.firstNumberAvailable) {
        if (!number1.includes(targetValue)) {   
            number1 += targetValue;
            updateDisplay(number1);
        }
    } else if (status.firstNumberAndOperatorAvailable) {
        number2 = "0" + targetValue;
        updateDisplay(number2);
        status.firstNumberAndOperatorAvailable = false;
        status.expressionIsComplete = true;
    } else if (status.expressionIsComplete) {
        if (!number2.includes(targetValue)) {   
            number2 += targetValue;
            updateDisplay(number2);
        }
    } else if (status.resultAvailable) {
        number1 = "0" + targetValue;
        updateDisplay(number1);
        status.firstNumberAvailable = true;
        status.resultAvailable = false;
    }
};

const clickBackspace = () => {
    if (status.noFirstNumberYet) {
        updateDisplay("No number to delete");
    } else if (status.firstNumberAvailable) {
        const number1Length = number1.length;
        number1 = number1.slice(0, number1Length - 1);
        if (number1Length < 2) {
            status.noFirstNumberYet = true;
            status.firstNumberAvailable = false;
            updateDisplay("-");
        } else {
            updateDisplay(number1);
        }
    } else if (status.firstNumberAndOperatorAvailable) {
        updateDisplay("No number to delete");
    } else if (status.expressionIsComplete) {
        const number2Length = number2.length;
        number2 = number2.slice(0, number2Length - 1);
        if (number2Length < 2) {
            status.firstNumberAndOperatorAvailable = true;
            status.expressionIsComplete = false;
            updateDisplay("-");
        } else {
            updateDisplay(number2);
        }
    } else if (status.resultAvailable) {
        const number1Length = number1.length;
        number1 = number1.slice(0, number1Length - 1);
        if (number1Length < 2) {
            status.noFirstNumberYet = true;
            status.resultAvailable = false;
            updateDisplay("-");
        } else {
            updateDisplay(number1);
        }
    }
};

const clickClear = () => {
    number1 = "";
    number2 = "";
    result = undefined;
    operator = "";
    updateDisplay("-");
    status.noFirstNumberYet = true;
    status.firstNumberAvailable = false;
    status.firstNumberAndOperatorAvailable = false;
    status.expressionIsComplete = false;
    status.resultAvailable = false;
};

const updateDisplay = value => {
    const display = document.querySelector(".display");
    display.textContent = value;
};

const getStatus = () => {
    if (status.noFirstNumberYet) {
        return "noFirstNumberYet";
    } else if (status.firstNumberAvailable) {
        return "firstNumberAvailable";
    } else if (status.firstNumberAndOperatorAvailable) {
        return "firstNumberAndOperatorAvailable";
    } else if (status.expressionIsComplete) {
        return "expressionIsComplete";
    } else if (status.resultAvailable) {
        return "resultAvailable";
    }
};

// DECLARATIONS
let number1 = "";
let number2 = "";
let result;
let operator = "";
let status = {
    noFirstNumberYet: true,
    firstNumberAvailable: false,
    firstNumberAndOperatorAvailable: false,
    expressionIsComplete: false,
    resultAvailable: false,
}

// MAIN
document.addEventListener("click", processClicks);

// Short Debug Log
// What went wrong, if anything?
// Which assumption was tested or confirmed?
// What did I change or learn?