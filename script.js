document.addEventListener('DOMContentLoaded', () => {

    let secretNumber;
    let attempts = 10;
    let guesses = [];

    // Stats (stored locally)
    let successCount = localStorage.getItem('successCount') || 0;
    let failCount = localStorage.getItem('failCount') || 0;

    const guessInput   = document.getElementById('guess-input');
    const guessBtn     = document.getElementById('guess-btn');
    const restartBtn   = document.getElementById('restart-btn');
    const feedback     = document.getElementById('feedback');
    const guessesList  = document.getElementById('guesses-list');
    const attemptsLeft = document.getElementById('attempts-left');
    const successDisplay = document.getElementById('success-count');
    const failDisplay    = document.getElementById('fail-count');

    const modal = document.getElementById('welcome-modal');
    const closeModal = document.getElementById('close-modal');

    successDisplay.textContent = successCount;
    failDisplay.textContent = failCount;

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    function startGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 10;
        guesses = [];
        attemptsLeft.textContent = attempts;
        feedback.textContent = "";
        guessesList.innerHTML = "";
        guessInput.value = "";
    }

    function launchConfetti() {
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function addGuess(guess, isCorrect) {
        const li = document.createElement('li');
        li.textContent = `Guess: ${guess}`;
        li.className = isCorrect ? 'correct' : 'incorrect';
        li.innerHTML += isCorrect ? ' ✅' : ' ❌';
        guessesList.appendChild(li);
    }

    guessBtn.addEventListener('click', () => {
        const guess = Number(guessInput.value);

        if (!guess || guess < 1 || guess > 100) {
            feedback.textContent = "Enter a number between 1 and 100!";
            return;
        }

        if (attempts <= 0) return;

        guesses.push(guess);

        if (guess === secretNumber) {
            feedback.textContent = `🎉 Correct! The number was ${secretNumber}!`;
            addGuess(guess, true);
            launchConfetti();
            successCount++;
            localStorage.setItem('successCount', successCount);
            successDisplay.textContent = successCount;
            attempts = 0;
            return;
        }

        attempts--;
        attemptsLeft.textContent = attempts;

        addGuess(guess, false);

        feedback.textContent = guess < secretNumber ? "🔺 Too low!" : "🔻 Too high!";

        if (attempts === 0) {
            feedback.textContent = `❌ Game Over! The number was ${secretNumber}`;
            failCount++;
            localStorage.setItem('failCount', failCount);
            failDisplay.textContent = failCount;
        }

        guessInput.value = "";
    });

    restartBtn.addEventListener('click', startGame);

    startGame();
});
