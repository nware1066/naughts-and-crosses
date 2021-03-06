// HTML elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');


// game variables

let gameIsLive = true;
let xIsNext = true;
let winner = null;


// functions

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (winner === 'x') {
        statusDiv.innerHTML = `${winner} has won!`;
    } else {
        statusDiv.innerHTML = `<span>${winner} has won!</span>`
    }
}


// consider adding classlist to winning path so color can be changed on winning symbols
// consider adding function/styling so that winning games can be stored and displayed on the sides of the board

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1]
    const topRight = cellDivs[2].classList[1]
    const middleLeft = cellDivs[3].classList[1]
    const middleMiddle = cellDivs[4].classList[1]
    const middleRight = cellDivs[5].classList[1]
    const bottomLeft = cellDivs[6].classList[1]
    const bottomMiddle = cellDivs[7].classList[1]
    const bottomRight = cellDivs[8].classList[1]

    if ( topLeft && topLeft === topMiddle && topLeft === topRight ) {
       handleWin(topLeft)
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomMiddle === bottomRight) {
        handleWin(bottomLeft);
    } else if (topLeft && topLeft === middleLeft && middleLeft === bottomLeft) {
        handleWin(topLeft);
    } else if (topMiddle && topMiddle === middleMiddle && middleMiddle === bottomMiddle) {
        handleWin(topMiddle);
    } else if (topRight && topRight === middleRight && middleRight === bottomRight) {
        handleWin(topRight);
    } else if (topLeft && topLeft === middleMiddle && middleMiddle === bottomRight) {
        handleWin(topLeft);
    } else if (topRight && topRight === middleMiddle && middleMiddle === bottomLeft) {
        handleWin(topRight)
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!'
    } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
            statusDiv.innerHTML = `x is next`;
        } else {
            statusDiv.innerHTML = `<span>o is next</span>`
        }
    }
}


const handleReset = (e) => {
    xIsNext = true;
    winner = null;
    statusDiv.innerHTML = `x is next`
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
    }
}

const handleCellClick = (e) => {
    const classList = e.target.classList

    if (classList[1] == 'x' || classList[1] == 'o') {
        return;
    }

    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
}

// event listeners

resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}
