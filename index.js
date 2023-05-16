const cellElemnts = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winnerMensageTextElements = document.querySelector('[data-winner-mensage-text]');
const winnerMensageElements = document.querySelector('[data-winner-mensage]');
const restartButton = document.querySelector('[data-winner-mensage-button]');

let isCircleTurn;

const winningCombnation = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElemnts) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.addEventListener('click', handleClick, { once: true })
    }


    setBoardHoverClass();

    winnerMensageElements.classList.remove('show-winner-mensage');
}

const endGame = (isDraw) => {
    if (isDraw) {
        winnerMensageTextElements.innerText = 'Empate!'
    } else {
        winnerMensageTextElements.innerText = isCircleTurn ? 'Círculo Venceu!' : 'X Venceu!'
    }

    winnerMensageElements.classList.add('show-winner-mensage');
}


const checkWinner = (currentPlayer) => {
    return winningCombnation.some((combination) => {
        return combination.every((index) => {
            return cellElemnts[index].classList.contains(currentPlayer);
        })
    })
}

const checkDraw = () => {
    return [...cellElemnts].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}


const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {

    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

const swapTurns = () => {
    // inverte o isCircleTurn
    isCircleTurn = !isCircleTurn

    setBoardHoverClass();

};

// Painel de Controle
const handleClick = (e) => {
    // Colocar o (X ou Círculo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);


    // Verificar Vitória 
    const isWin = checkWinner(classToAdd);

    // Verificar Empate 
    const isDraw = checkDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // Mudar próximo símbolo
        swapTurns();
    }

}

startGame();

restartButton.addEventListener("click", startGame);

