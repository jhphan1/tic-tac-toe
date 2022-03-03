// Gameboard module
const gameboard = (() => {
    // Create 9 square array
    let array = new Array(10);
    // Link each array element to DOM square with textContent
    const squares = document.querySelectorAll(".container div");
    squares.forEach(square => square.textContent = "X");
})();


// Player factory
function makePlayer (name, marker) {
    return {name, marker};
};

// Game Flow module
//     Players alternate turns

// Display Controller module
//     displayWinner()


// Function: add mark to square
//     Player clicks on square
//     Player's mark is added to array
//     DOM is updated with mark
//     Error: Can't add to pre-filled square