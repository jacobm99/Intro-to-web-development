
// Data Structure: Array of objects holding pet information
const petsData = [
    { name: "Bella", species: "dog", age: "2 years", trait: "Energetic and loves to play fetch." },
    { name: "Luna", species: "cat", age: "1 year", trait: "Quiet, sweet, and loves window sills." },
    { name: "Max", species: "dog", age: "5 years", trait: "Calm senior dog looking for a cozy couch." },
    { name: "Oliver", species: "cat", age: "3 months", trait: "Playful kitten who loves string toys." },
    { name: "Daisy", species: "dog", age: "1 year", trait: "Friendly, great with kids and other dogs." }
];

// Render Function: Groups pets by species
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

// Event Listener Setup: Attaches click events and SAVES TO LOCAL STORAGE
function setupEventListeners() {
    const buttons = document.querySelectorAll(".filter-btn");
    
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const selectedSpecies = event.target.getAttribute("data-filter");
            filterPets(selectedSpecies);
            
            // Save
            localStorage.setItem("preferredPetFilter", selectedSpecies);
        });
    });
}

// Form Validation Logic
function setupFormValidation() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        let isValid = true;

        const nameInput = document.getElementById("userName");
        const emailInput = document.getElementById("userEmail");
        const messageInput = document.getElementById("userMessage");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");

        document.querySelectorAll(".error-message").forEach(el => {
            el.innerText = "";
            el.classList.remove("visible");
        });
        document.querySelectorAll(".input-error").forEach(el => {
            el.classList.remove("input-error");
        });

        if (nameInput.value.trim() === "") {
            nameError.innerText = "Please enter your full name.";
            nameError.classList.add("visible");
            nameInput.classList.add("input-error");
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.innerText = "Please enter a valid email (e.g., name@example.com).";
            emailError.classList.add("visible");
            emailInput.classList.add("input-error");
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            messageError.innerText = "Your message must be at least 10 characters long.";
            messageError.classList.add("visible");
            messageInput.classList.add("input-error");
            isValid = false;
        }

        if (isValid) {
            alert("Thank you! Your inquiry has been successfully submitted.");
            contactForm.reset(); 
        }
    });
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    if (typeof petsData !== 'undefined' && document.getElementById("pets-container")) {
        
        const savedFilter = localStorage.getItem("preferredPetFilter") || "all";
        
        filterPets(savedFilter); 
        setupEventListeners(); 
    }
    
    setupFormValidation();
});