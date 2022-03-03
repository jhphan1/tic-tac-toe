// Gameboard module
const gameboard = (() => {
    // Create 9 square array
    let array = new Array(9);
    // Randomly pre-fill array
    array = [
            "X", "O", " ",
            "O", " ", "X",
            "O", "X", " "
    ]
    // Link each array element to DOM square with textContent
    const squares = document.querySelectorAll(".container div");

    const refresh = () => {
        for (let i = 0; i < array.length; i++) {
            squares[i].textContent = array[i];
        };
    }

    refresh();

    return {array, refresh};
})();


// Player factory
function makePlayer (name, marker) {
    return {name, marker};
};

// Pre-fill some players 
const playerOne = makePlayer("Anna", "X");
const playerTwo = makePlayer("Jason", "O");


// Game Flow module
const gameFlow = (() => {
//     Players alternate turns
    let currentTurn = playerOne;

    const squares = document.querySelectorAll(".container div");
    squares.forEach(square => square.addEventListener("click", addMarker));

    function addMarker() {
        // Add current player's marker to empty square
        if (gameboard.array[this.id] === " ") {
            gameboard.array[this.id] = currentTurn.marker;
            gameboard.refresh();

            // Next player's turn
            currentTurn = (currentTurn === playerOne) ? playerTwo : playerOne;
        } else {
            return;
        }
    };
})();



// Display Controller module
//     displayWinner()