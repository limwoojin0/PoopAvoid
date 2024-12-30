let player = document.getElementById('player');
let gameArea = document.getElementById('gameArea');
let scoreElement = document.getElementById('score');
let gameOverElement = document.getElementById('gameOver');
let finalScoreElement = document.getElementById('finalScore');
let restartBtn = document.getElementById('restartBtn');

let gameWidth = gameArea.offsetWidth;
let gameHeight = gameArea.offsetHeight;
let playerWidth = player.offsetWidth;
let playerHeight = player.offsetHeight;

let playerX = gameWidth / 2 - playerWidth / 2;
let score = 0;
let isGameOver = false;
let poopElements = [];

let poopSpeed = 9;
let poopInterval;
let gameInterval;

function movePlayer(event) {
    if (isGameOver) return;
    if (event.key === 'ArrowLeft' && playerX > 0) {
        playerX -= 15;
    } else if (event.key === 'ArrowRight' && playerX < gameWidth - playerWidth) {
        playerX += 15;
    }
    player.style.left = playerX + 'px';
}

function createPoop() {
    if (isGameOver) return;
    let poop = document.createElement('div');
    poop.classList.add('poop');
    poop.style.width = '30px';
    poop.style.height = '30px';
    poop.style.backgroundColor = 'brown';
    poop.style.position = 'absolute';
    poop.style.top = '0px';
    poop.style.left = Math.random() * (gameWidth - 30) + 'px';
    gameArea.appendChild(poop);
    poopElements.push(poop);
}

function movePoops() {
    if (isGameOver) return;
    poopElements.forEach((poop, index) => {
        let poopTop = parseInt(poop.style.top) || 0;
        poopTop += poopSpeed;

        if (poopTop >= gameHeight) {
            poop.remove();
            poopElements.splice(index, 1);
            score++;
            scoreElement.textContent = '점수: ' + score;
        } else {
            poop.style.top = poopTop + 'px';
        }

        if (poopTop + 30 >= gameHeight - playerHeight &&
            parseInt(poop.style.left) < playerX + playerWidth &&
            parseInt(poop.style.left) + 30 > playerX) {
            endGame();
        }
    });
}

function endGame() {
    if (isGameOver) return;
    isGameOver = true;
    clearInterval(poopInterval);
    clearInterval(gameInterval);
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = score;
}

function startGame() {
    score = 0;
    scoreElement.textContent = '점수: 0';
    playerX = gameWidth / 2 - playerWidth / 2;
    player.style.left = playerX + 'px';
    poopElements = [];
    isGameOver = false;
    gameOverElement.style.display = 'none';

    let allPoops = document.querySelectorAll('.poop');
    allPoops.forEach(poop => poop.remove());

    poopInterval = setInterval(createPoop, 1000);
    gameInterval = setInterval(movePoops, 100);
    document.addEventListener('keydown', movePlayer);
}

restartBtn.addEventListener('click', startGame);

startGame();
