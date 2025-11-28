let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const restartGame = document.getElementById('restartGame');

submitGuess.addEventListener('click', function() {
    const userGuess = Number(guessInput.value);
    if (!userGuess || userGuess < 1 || userGuess > 100) {
        feedback.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }
    attempts++;
    attemptsDisplay.textContent = attempts;
    if (userGuess < randomNumber) {
        feedback.textContent = "Too low! Try again.";
    } else if (userGuess > randomNumber) {
        feedback.textContent = "Too high! Try again.";
    } else {
        feedback.textContent = `Correct! You guessed it in ${attempts} attempts.`;
        submitGuess.disabled = true;
        guessInput.disabled = true;
    }
    guessInput.value = '';
});

restartGame.addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    feedback.textContent = '';
    guessInput.value = '';
    submitGuess.disabled = false;
    guessInput.disabled = false;
});
