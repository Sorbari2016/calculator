// Javascript code 

// BUTTONS
// Array to store numbers or symbols on buttons
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
    }  else if (value === "+/-") {
        toggleSign();
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


// Function to enable the +/- work properly
function toggleSign() {
  let text = display.textContent.trim();
  
  // Split by spaces to get the last entered number
  let parts = text.split(" ");
  let lastNumber = parts.pop(); // Get the last number

  if (!isNaN(lastNumber) && lastNumber !== "") {
    lastNumber = parseFloat(lastNumber) * -1; // Toggle sign
    parts.push(lastNumber); // Replace with updated number
    display.textContent = parts.join(" "); // Reconstruct display
  }
}


// Handle Number Input (Keeps full expression)
function handleNumber(value) {
  // If a result was just displayed, clear it and start fresh
  if (currentOperator === null && firstOperand !== null) {
    display.textContent = value;
    firstOperand = null; // Reset first operand so a new calculation starts
  } else {
    // Prevent multiple decimal points in the current number
    const lastNumber = display.textContent.split(/[\s+\-*/]+/).pop(); // Get the last entered number
    if (value === "." && lastNumber.includes(".")) return; // If "." exists, ignore input

    display.textContent = display.textContent === "0" ? value : display.textContent + value;
  }
}


// Handle Operator Input (Always Displays Operators)

function handleOperator(operator) {
  let text = display.textContent.trim();
  
  // Check if the last character is an operator
  if (operators.test(text[text.length - 1])) {
    display.textContent = text.slice(0, -1) + " " + operator + " ";
    currentOperator = operator; // Update to new operator
    return;
  }

  if (firstOperand === null) {
    firstOperand = parseFloat(display.textContent);
  } else if (currentOperator !== null) {
    secondOperand = parseFloat(display.textContent.split(" ").pop());

    // Ensure secondOperand is a valid number before evaluation
    if (!isNaN(secondOperand)) {
      firstOperand = operate(firstOperand, secondOperand, currentOperator);
      display.textContent = firstOperand; // Update display with result
    }
  }

  display.textContent += " " + operator + " ";
  currentOperator = operator;
  shouldResetDisplay = true;
}



// Mathematical Operations
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
  let result;
  
  switch (operator) {
    case "+": result = add(a, b); break;
    case "-": result = subtract(a, b); break;
    case "*": result = multiply(a, b); break;
    case "/": result = (b === 0 ? "Error" : divide(a, b)); break;
    default: return b;
  }

  // Round long decimals to 6 places (if it's a number)
  return typeof result === "number" ? parseFloat(result.toFixed(8)) : result;
}


// Reset Calculator
function resetCalculator() {
  display.textContent = "0";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
}


// **Keyboard Support**
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    handleNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
  } else if (key === "Enter") {
    handleInput("="); // Simulate "=" button click
  } else if (key === "Backspace") {
    handleInput("C"); // Simulate "C" button click
  } else if (key.toLowerCase() === "a" || key === "Escape") {
    resetCalculator(); // Simulate "Ac" button click
  } else if (key === "%") {
    handleOperator("%");
  } else if (key === "+/-") {
    toggleSign();
  }
});

