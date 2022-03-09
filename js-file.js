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
let playerOne = makePlayer("Player One", "X");
let playerTwo = makePlayer("Player Two", "O");


// Display Controller module
const displayController = (() => {
    // Reset button
    const resetGame = () => {
        gameboard.array.forEach((element, index) => {
            gameboard.array[index] = undefined;
        });

        gameboard.refresh();
        gameFlow.resetTurn();
    }

    const reset = document.querySelector(".reset");
    reset.addEventListener("click", resetGame)

    // Play button
    const P1name = document.querySelector(".P1-name");
    const P1marker = document.querySelector(".P1-marker");
    const P2name = document.querySelector(".P2-name");
    const P2marker = document.querySelector(".P2-marker");
    const P1nameInput = document.querySelector("#P1-name-input");
    const P1markerInput = document.querySelector("#P1-marker-input");
    const P2nameInput = document.querySelector("#P2-name-input");
    const play = document.querySelector(".play");

    play.addEventListener("click", setPlayers);

    function setPlayers() {
        if (!P1nameInput.value || !P2nameInput.value) { return alert("Enter a name!")};
        if (P1nameInput.value === P2nameInput.value) { return alert("Names must be different!")};
        playerOne = makePlayer(P1nameInput.value, P1markerInput.value);
        playerTwo = makePlayer(P2nameInput.value, (P1markerInput.value === "X") ? "O" : "X");
        P1name.textContent = playerOne.name;
        P1marker.textContent = playerOne.marker;
        P2name.textContent = playerTwo.name;
        P2marker.textContent = playerTwo.marker;
        resetGame();
    }

    // Display glow
    function glowOn(player) {
        if (player === "one") {
            P1name.style.color = "orange";
        }
        if (player === "two") {
            P1name.style.color = "orange";
        }
    }

    return { glowOn };
})();


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


    // reset button
    // player can choose name/marker
    // reset button on game-over popup


// BUGS TO FIX:
