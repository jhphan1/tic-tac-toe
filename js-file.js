// Gameboard module
const gameboard = (() => {
    // Create 9 square array
    let array = new Array(9);
    
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
    let currentTurn = playerOne;

    const squares = document.querySelectorAll(".container div");
    squares.forEach(square => square.addEventListener("click", addMarker));

    function addMarker() {
        // Add current player's marker to empty square
        if (gameboard.array[this.id] === undefined) {
            gameboard.array[this.id] = currentTurn.marker;
            gameboard.refresh();

            checkGameOver();

            // Players alternate turns
            currentTurn = (currentTurn === playerOne) ? playerTwo : playerOne;
        } else {
            // Do nothing if square is already filled
            return;
        }
    };

    function checkGameOver() {
        
        if (// Horizontal win
            gameboard.array[0] === currentTurn.marker && gameboard.array[1] === currentTurn.marker && gameboard.array[2] === currentTurn.marker ||
            gameboard.array[3] === currentTurn.marker && gameboard.array[4] === currentTurn.marker && gameboard.array[5] === currentTurn.marker ||
            gameboard.array[6] === currentTurn.marker && gameboard.array[7] === currentTurn.marker && gameboard.array[8] === currentTurn.marker ||
            // Vertical win
            gameboard.array[0] === currentTurn.marker && gameboard.array[3] === currentTurn.marker && gameboard.array[6] === currentTurn.marker ||
            gameboard.array[1] === currentTurn.marker && gameboard.array[4] === currentTurn.marker && gameboard.array[7] === currentTurn.marker ||
            gameboard.array[2] === currentTurn.marker && gameboard.array[5] === currentTurn.marker && gameboard.array[8] === currentTurn.marker ||
            // Diagonal win
            gameboard.array[0] === currentTurn.marker && gameboard.array[4] === currentTurn.marker && gameboard.array[8] === currentTurn.marker ||
            gameboard.array[2] === currentTurn.marker && gameboard.array[4] === currentTurn.marker && gameboard.array[6] === currentTurn.marker) {
            console.log(`Winner is ${currentTurn.name}`);
        }
        // Tie
    }
})();



// Display Controller module
//     displayWinner()