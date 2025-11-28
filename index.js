let secretNumber;
let guesses = [];

const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const restartBtn = document.getElementById('restart-btn');
const feedback = document.getElementById('feedback');
const guessesList = document.getElementById('guesses-list');

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  guesses = [];
  feedback.textContent = '';
  guessesList.innerHTML = '';
  guessInput.value = '';
  console.log('Secret Number:', secretNumber); // for testing
}

function addGuess(guess, isCorrect) {
  const li = document.createElement('li');
  li.textContent = `Your guess: ${guess}`;
  li.className = isCorrect ? 'correct' : 'incorrect';
  li.innerHTML += isCorrect ? ' ✅' : ' ❌';
  guessesList.appendChild(li);
}

guessBtn.addEventListener('click', () => {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = 'Please enter a valid number between 1 and 100!';
    return;
  }

  if (guesses.includes(guess)) {
    feedback.textContent = 'You already guessed that number!';
    return;
  }

  guesses.push(guess);

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Congratulations! You guessed the number ${secretNumber}!`;
    addGuess(guess, true);
  } else {
    feedback.textContent = guess < secretNumber ? '🔺 Too low!' : '🔻 Too high!';
    addGuess(guess, false);
  }

  guessInput.value = '';
});

restartBtn.addEventListener('click', startGame);

// Start the game initially
startGame();
