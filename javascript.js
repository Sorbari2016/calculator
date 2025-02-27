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