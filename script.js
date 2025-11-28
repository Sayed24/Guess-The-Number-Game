let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let wins = 0;
let fails = 0;

const attemptsEl = document.getElementById("attempts");
const winsEl = document.getElementById("wins");
const failsEl = document.getElementById("fails");
const messageEl = document.getElementById("message");
const historyList = document.getElementById("historyList");
const restartBtn = document.getElementById("restartBtn");

document.getElementById("guessBtn").addEventListener("click", makeGuess);

function makeGuess() {
    const guess = Number(document.getElementById("userInput").value);
    if (!guess || guess < 1 || guess > 100) {
        messageEl.textContent = "Enter a valid number (1-100).";
        return;
    }

    attempts++;
    attemptsEl.textContent = attempts;

    let resultText = "";
    let icon = "";

    if (guess === randomNumber) {
        resultText = "Correct!";
        icon = "✔️";
        wins++;
        winsEl.textContent = wins;
        endGame(true);
    } else if (guess > randomNumber) {
        resultText = "Too high!";
        icon = "❌";
    } else {
        resultText = "Too low!";
        icon = "❌";
    }

    addHistory(guess, resultText, icon);

    if (attempts >= 10) {
        fails++;
        failsEl.textContent = fails;
        messageEl.textContent = "Game Over! You used all attempts.";
        endGame(false);
    }
}

function addHistory(guess, text, icon) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${guess}</span> <span>${text} ${icon}</span>`;
    historyList.appendChild(li);
}

function endGame(won) {
    messageEl.textContent = won ? "🎉 You guessed it!" : "Try again!";
    restartBtn.classList.remove("hidden");
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("userInput").disabled = true;
}

restartBtn.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsEl.textContent = 0;
    historyList.innerHTML = "";
    messageEl.textContent = "";
    restartBtn.classList.add("hidden");
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("userInput").disabled = false;
});