// Javascript code 

// BUTTONS
// Variable to store numbers or symbols on buttons
const buttonValues = [
  "Ac", "7", "4","1","0",
  "+/-", "8", "5", "2",".",
  "%", "9", "6", "3", "C",
  "/", "*", "-",  "+","="
];

// To select the calButtons element
const container = document.getElementById("calcButtons");

// To create the buttons with text in them
for (let i = 0; i < buttonValues.length ; i++) { 
  const roundBtn = document.createElement("button");
  roundBtn.classList.add("roundBtn"); // Add class
  roundBtn.textContent = buttonValues[i]; // Set button text
  container.appendChild(roundBtn); // Attach button to container
}


// DISPLAY
const display = document.getElementById("resultScreen");
const buttons = document.querySelectorAll(".roundBtn");

// Initialize display and variables
display.textContent = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

// Regular expression to check for operators
const operators = /[+\-*/]/;

// Add click event listener to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "Ac") {
      resetCalculator();
    } else if (value === "C") {
      display.textContent = display.textContent.length > 1 ? display.textContent.slice(0, -1) : "0";
    } else if (value === "=") {
      if (firstOperand !== null && currentOperator !== null) {
        secondOperand = parseFloat(display.textContent.split(" ").pop()); // Get last number
        display.textContent = operate(firstOperand, secondOperand, currentOperator);
        firstOperand = parseFloat(display.textContent);
        currentOperator = null;
      }
    } else if (operators.test(value)) {
      handleOperator(value);
    } else {
      handleNumber(value);
    }
  });
});

// Handle Number Input (Keeps full expression)
function handleNumber(value) {
  if (shouldResetDisplay) {
    shouldResetDisplay = false; // Prevent display reset
  }

  display.textContent = display.textContent === "0" ? value : display.textContent + value;
}

// Handle Operator Input (Always Displays Operators)
function handleOperator(operator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(display.textContent);
  } else if (currentOperator !== null) {
    secondOperand = parseFloat(display.textContent.split(" ").pop());
    firstOperand = operate(firstOperand, secondOperand, currentOperator);
    display.textContent = firstOperand; // Show result
  }

  // Always display the full expression
  display.textContent += " " + operator + " ";
  currentOperator = operator;
  shouldResetDisplay = false; // Do not reset display now
}

// Mathematical Operations (Your Functions)
function add(operand1, operand2) {
  return operand1 + operand2;
}

function subtract(operand1, operand2) {
  return operand1 - operand2;
}

function multiply(operand1, operand2) {
  return operand1 * operand2;
}

function divide(operand1, operand2) {
  return operand2 === 0 ? "Error" : operand1 / operand2;
}

// Operate Function
function operate(a, b, operator) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return b;
  }
}

// Reset Calculator
function resetCalculator() {
  display.textContent = "0";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
}

