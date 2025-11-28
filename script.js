document.addEventListener('DOMContentLoaded', () => {
  let secretNumber;
  let guesses = [];
  const maxAttempts = 10;

  let successCount = 0;
  let failCount = 0;

  const guessInput = document.getElementById('guess-input');
  const guessBtn = document.getElementById('guess-btn');
  const restartBtn = document.getElementById('restart-btn');
  const feedback = document.getElementById('feedback');
  const guessesList = document.getElementById('guesses-list');
  const attemptsCount = document.getElementById('attempts-count');
  const progressBar = document.getElementById('progress-bar');
  const successDisplay = document.getElementById('success-count');
  const failDisplay = document.getElementById('fail-count');

  function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guesses = [];
    feedback.textContent = '';
    guessesList.innerHTML = '';
    guessInput.value = '';
    attemptsCount.textContent = '0';
    progressBar.style.width = '0%';
    console.log('Secret Number:', secretNumber); // for testing
  }

  function addGuess(guess, isCorrect) {
    const li = document.createElement('li');
    li.textContent = `Your guess: ${guess}`;
    li.className = isCorrect ? 'correct' : 'incorrect';
    li.innerHTML += isCorrect ? ' ✅' : ' ❌';
    guessesList.appendChild(li);
    li.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function launchConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  function updateProgress() {
    attemptsCount.textContent = guesses.length;
    const percent = Math.min((guesses.length / maxAttempts) * 100, 100);
    progressBar.style.width = percent + '%';
  }

  function endGame(success) {
    if (success) {
      feedback.textContent = `🎉 You guessed it! The number was ${secretNumber}.`;
      launchConfetti();
      successCount++;
    } else {
      feedback.textContent = `❌ You failed! The number was ${secretNumber}. Try again.`;
      failCount++;
    }
    successDisplay.textContent = successCount;
    failDisplay.textContent = failCount;
    guessBtn.disabled = true;
    guessInput.disabled = true;
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

    if (guesses.length >= maxAttempts) {
      endGame(false);
      return;
    }

    guesses.push(guess);
    updateProgress();

    if (guess === secretNumber) {
      addGuess(guess, true);
      endGame(true);
    } else {
      addGuess(guess, false);
      feedback.textContent = guess < secretNumber ? '🔺 Too low!' : '🔻 Too high!';
      if (guesses.length === maxAttempts) {
        endGame(false);
      }
    }

    guessInput.value = '';
    guessInput.focus();
  });

  restartBtn.addEventListener('click', () => {
    startGame();
    guessBtn.disabled = false;
    guessInput.disabled = false;
  });

  startGame();
});
