// Javascript code 

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


// Functions to run basic math operations
// To simply add items
function add (operand1, operand2, ...operandn) {
  return operand1 + operand2 + operandn.reduce((acc, num) => acc + num, 0);
}

// To simply subtract items
function subtract(operand1, operand2, ...operandn) {
  return operand1 - operand2 - operandn.reduce((acc, num) => acc + num, 0);
}

// To simply multiply items
function multiply(operand1, operand2, ...operandn) {
  return operand1 * operand2 * operandn.reduce((acc, num) => acc * num, 1);
}

// To simply divide items
function divide(operand1, operand2, ...operandn) {
  return operandn.reduce((acc, num) => acc / num, operand1 / operand2);
}

// Variables that will store numbers(operands), & operators
let operand1 = null;  // First number
let operator = null;  // Operator (+, -, *, /)
let operand2 = null; // Second number


// DISPLAY
// Select the result screen
const display = document.getElementById("resultScreen");

// Select all buttons inside the calculator
const buttons = document.querySelectorAll(".roundBtn");

// Initialize display with "0"
display.textContent = "0";

// Regular expression to check for operators
const operators = /[+\-*/]/;

// Add click event listener to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent; // Get button text

    if (value === "Ac") {
      display.textContent = "0"; // Clear everything
    } else if (value === "C") {
      display.textContent = display.textContent.trim().length > 1
        ? display.textContent.slice(0, -1).trim()
        : "0";
    } else if (value === "=") {
      display.textContent = operate(display.textContent); // Calculate result
    } else {
      if (operators.test(value)) {
        // Add spaces before and after the operator
        display.textContent += ` ${value} `;
      } else {
        // Append value to the display, replace "0" if it's the first input
        display.textContent = display.textContent === "0" ? value : display.textContent + value;
      }
    }
  });
});
