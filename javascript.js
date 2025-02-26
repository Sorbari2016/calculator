// Javascript code 

// To Select the calContainer element 
const container = document.getElementById("calcButtons"); 

// To create the 4 * 5 divs for the circular buttons
for (let i = 0; i < 5 * 4; i++) { 
  const roundBtn = document.createElement("button");
  roundBtn.classList.add("roundBtn"); 
  container.appendChild(roundBtn);
}