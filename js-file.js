// Gameboard module
const gameboard = (() => {
    // Create 9 square array
    let array = new Array(9);
    
    // Link each array element to DOM square with textContent
    const squares = document.querySelectorAll(".gameboard div");

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

    // Allow other modules to reset currentTurn
    const resetTurn = () => { currentTurn = playerOne };

    const overlay = document.querySelector(".overlay");
    const gameOver = document.querySelector(".game-over");

    const squares = document.querySelectorAll(".gameboard div");
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
            return stopGame(currentTurn.name);
        }
        // Tie if gameboard is full
        let isTie = true;
        for (let i = 0; i < gameboard.array.length; i++) {
            if (gameboard.array[i] === undefined) {
                isTie = false;
                break;
            }
        }

        if (isTie) { return stopGame("tie") };
    }

    // Stop game
    function stopGame(result) {
        overlay.style.display = "block";
        gameOver.style.display = "block";

        if (result === "tie") {
            gameOver.textContent = "It's a tie!"
        } else {
            gameOver.textContent = `${result} is the winner! Congrats!`;
        }
    }

    return { resetTurn };

})();


// Display Controller module
let displayController = (() => {
    const resetGame = () => {
        gameboard.array.forEach((element, index) => {
            gameboard.array[index] = undefined;
        });

        gameboard.refresh();
        gameFlow.resetTurn();
    }

    const reset = document.querySelector(".reset");
    reset.addEventListener("click", resetGame)
})();
    // reset button
    // player can choose name/marker
    // reset button on game-over popup


// BUGS TO FIX:
