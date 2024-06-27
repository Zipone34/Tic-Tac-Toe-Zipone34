let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let player1 = '';
let player2 = '';

const statusDisplay = document.getElementById('status');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    player1 = document.getElementById('player1').value || 'Player 1';
    player2 = document.getElementById('player2').value || 'Player 2';
    document.querySelector('.player-info').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    statusDisplay.innerHTML = `${player1} (X) vs ${player2} (O)`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `${currentPlayer === 'X' ? player1 : player2} wins!`;
        isGameActive = false;
        document.getElementById('restart').style.display = 'inline';
        return;
    }

    if (!board.includes('')) {
        statusDisplay.innerHTML = 'Game ended in a draw!';
        isGameActive = false;
        document.getElementById('restart').style.display = 'inline';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `${currentPlayer === 'X' ? player1 : player2}'s turn (${currentPlayer})`;
}

function makeMove(index) {
    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].innerHTML = currentPlayer;
    handleResultValidation();
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('restart').style.display = 'none';
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    statusDisplay.innerHTML = `${player1} (X) vs ${player2} (O)`;
}

document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('myAudio');
    
    // Attempt to play the audio
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(function() {
            // Autoplay started successfully
            console.log('Autoplay started');
        }).catch(function(error) {
            // Autoplay was prevented
            console.log('Autoplay was prevented:', error);
            
            // Try to play again after user interaction (click)
            document.addEventListener('click', function() {
                audio.play();
            }, { once: true });
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    let progress = 0;

    function updateProgress() {
        if (progress < 100) {
            progress += 1;
            progressBar.style.width = progress + '%';
            progressBar.textContent = progress + '%';
            setTimeout(updateProgress, 100); // Adjust the speed here
        } else {
            window.location.href = 'game.html'; // Change 'newfile.html' to the path of the file you want to open
        }
    }

    updateProgress();
});