
// Data: Array of objects holding pet information
const petsData = [
    { name: "Bella", species: "dog", age: "2 years", trait: "Energetic and loves to play fetch." },
    { name: "Luna", species: "cat", age: "1 year", trait: "Quiet, sweet, and loves window sills." },
    { name: "Max", species: "dog", age: "5 years", trait: "Calm senior dog looking for a cozy couch." },
    { name: "Oliver", species: "cat", age: "3 months", trait: "Playful kitten who loves string toys." },
    { name: "Daisy", species: "dog", age: "1 year", trait: "Friendly, great with kids and other dogs." }
];

// Function: Groups pets by species and builds HTML
function renderPets(petsToDisplay) {
    const container = document.getElementById("pets-container");
    container.innerHTML = "";

    const uniqueSpecies = [...new Set(petsToDisplay.map(pet => pet.species))];

    uniqueSpecies.forEach(species => {
        const groupWrapper = document.createElement("div");
        groupWrapper.classList.add("species-group");
        
        const groupTitle = document.createElement("h3");
        groupTitle.classList.add("group-title");
        groupTitle.innerText = species.charAt(0).toUpperCase() + species.slice(1) + "s";
        groupWrapper.appendChild(groupTitle);

        const grid = document.createElement("div");
        grid.classList.add("pets-grid");

        const petsInGroup = petsToDisplay.filter(pet => pet.species === species);

        petsInGroup.forEach(pet => {
            const card = document.createElement("div");
            card.classList.add("pet-card");
            
            card.innerHTML = `
                <h4>${pet.name}</h4>
                <p><strong>Age:</strong> ${pet.age}</p>
                <p><strong>Personality:</strong> ${pet.trait}</p>
            `;
            
            grid.appendChild(card);
        });

        groupWrapper.appendChild(grid);
        container.appendChild(groupWrapper);
    });
}

// Filter Function: Filters the master array based on user selection
function filterPets(species) {
    if (species === "all") {
        renderPets(petsData);
    } else {
        const filteredArray = petsData.filter(pet => pet.species === species);
        renderPets(filteredArray);
    }
}

// Event Listener Setup: Attaches click events to buttons
function setupEventListeners() {
    const buttons = document.querySelectorAll(".filter-btn");
    
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const selectedSpecies = event.target.getAttribute("data-filter");
            filterPets(selectedSpecies);
        });
    });
}

// Initialization: Runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    renderPets(petsData);
    setupEventListeners();
});