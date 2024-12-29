let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

function startGame() {
    // Reset game state

    const startOverlay = document.getElementById("start-overlay");
    startOverlay.classList.add("hidden");

    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();
    document.getElementById("board").innerHTML = "";

    // Set up the grid
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    // Start mole and plant intervals
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);

    // Hide the start button after initializing the game
    document.getElementById("start-button").classList.add("hidden");
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this === currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;

        // Show the start button again
        document.getElementById("start-button").classList.remove("hidden");

        const startOverlay = document.getElementById("start-overlay");
        startOverlay.classList.remove("hidden");
    }
}

// Attach start button event listener
window.onload = function () {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startGame);
};

/*menu animation*/
document.addEventListener("DOMContentLoaded", () => {
    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");
    const contentWrappers = document.querySelectorAll(".content-wrapper"); 
    
    
    
    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
  
        contentWrappers.forEach((contentWrapper) => {
            if (offScreenMenu.classList.contains("active")) {
                contentWrapper.style.transition = "width 0.3s ease";
                contentWrapper.style.width = "67%"; // Shrink width
                offScreenMenu.style.width = "33%";
            } else {
                contentWrapper.style.transition = "width 0.3s ease";
                contentWrapper.style.width = "100%"; // Reset width
            }
        });
    });
  });


document.addEventListener("DOMContentLoaded", () => {
const particleContainer = document.querySelector('.particle-container');

if (particleContainer) {
    function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${4 + Math.random() * 4}s`; // 4 to 8 seconds
    particle.style.animationDelay = `${Math.random() * 2}s`; // 0 to 2 seconds

    particleContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 8000);
    }

    setInterval(createParticle, 100);
}
});
  
  
  