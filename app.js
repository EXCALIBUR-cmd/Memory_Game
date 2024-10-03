const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-btn");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesFound = 0;

// Card icons for the game (you can replace these with images)
const cardIcons = ['🍎', '🍌', '🍇', '🍒', '🍍', '🍉', '🍓', '🍋'];

// Duplicate the icons array to create pairs and shuffle the deck
const cards = [...cardIcons, ...cardIcons].sort(() => 0.5 - Math.random());

function createCard(icon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${icon}</div>
        </div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
}

function startGame() {
    gameBoard.innerHTML = ''; // Clear the game board
    matchesFound = 0;
    cards.forEach(icon => createCard(icon));
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.card-back').textContent === 
                    secondCard.querySelector('.card-back').textContent;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

    matchesFound++;
    if (matchesFound === cardIcons.length) {
        setTimeout(() => alert("You've won!"), 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

resetButton.addEventListener('click', startGame);

// Start the game initially
startGame();
