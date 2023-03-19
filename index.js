const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restartBtn");
const statusText = document.querySelector("#statusText");
const winConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initialize();

function initialize() {
cells.forEach(cell => cell.addEventListener("click", cellClicked));
cells.forEach(cell => cell.addEventListener("mouseover", changetoYellow));
cells.forEach(cell => cell.addEventListener("mouseleave", changetoWhite));
restartBtn.addEventListener('mouseover', changetoGreen);
restartBtn.addEventListener('mouseleave', changetoWhite)
restartBtn.addEventListener("click", restartGame);
statusText.textContent = `Player ${currentPlayer}'s turn!`
running = true;

}
function changetoYellow() {
    this.style.backgroundColor = "rgb(253, 253, 199)";
}

function changetoGreen() {
    this.style.backgroundColor = "rgb(117, 250, 181)";
}

function changetoWhite() {
    this.style.backgroundColor = "white";
}

 
function cellClicked() {

    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    
    cellUpdate(this, cellIndex);
    checkWinner();
    
}

function cellUpdate(cell, index) {

    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
}

function checkWinner() {

    let won = false;

    for (let i = 0; i < winConditions.length; i++) {

        let eachCondition = winConditions[i];
        const A = options[eachCondition[0]];
        const B = options[eachCondition[1]];
        const C = options[eachCondition[2]];

        if (A == "" || B == "" || C == "") {
            continue;
        }
         if (A == B && B == C) {
            won = true;
            break;
        }

    }

    if (won) {

        statusText.textContent = `Player ${currentPlayer} Won!`
        running = false; 
    }

    else if (!options.includes("")) {

        statusText.textContent = `It's a Draw!`; 
        running = false; 
    }
    else {
        changePlayer();
    }

}


function changePlayer() {

    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn!`;

}

function restartGame() {

    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s Turn!`;
    initialize();
}





