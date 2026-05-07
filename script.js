const boardElement = document.getElementById('board');
const statusElement = document.getElementById('current-player');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// All possible winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if cell is already filled or game is over
    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedIndex);
    checkResult();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function checkResult() {
    let roundWon = false;
    let winningCombo = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningCombo = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `🎉 Player <span style="color: var(--accent-x)">${currentPlayer}</span> Wins!`;
        highlightWinner(winningCombo);
        gameActive = false;
        return;
    }

    // Check for Draw
    if (!gameState.includes("")) {
        statusText.innerText = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    // Switch Player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.innerText = currentPlayer;
}

function highlightWinner(combo) {
    combo.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.innerHTML = `Player <span id="current-player">X</span>'s Turn`;
    
    // We need to re-grab the element because innerHTML replaced it
    // A better way is to just update the text node of the span
    document.getElementById('current-player').innerText = "X";

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o', 'winner');
    });
}

// Event Listeners
boardElement.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', restartGame);
