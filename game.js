document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const playerNameEl = document.getElementById('player-name');
    const highScoreEl = document.getElementById('high-score');
    const scoreEl = document.getElementById('score');
    const timeLeftEl = document.getElementById('time-left');
    const timerBarEl = document.getElementById('timer-bar');
    const problemEl = document.getElementById('problem');
    const num1El = document.getElementById('num1');
    const num2El = document.getElementById('num2');
    const operatorEl = document.getElementById('operator');
    const answerInput = document.getElementById('answer-input');
    const gameArea = document.getElementById('game-area');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreEl = document.getElementById('final-score');
    const finalPlayerNameEl = document.getElementById('final-player-name');
    const newHighScoreMessage = document.getElementById('new-highscore-message');
    const restartBtn = document.getElementById('restart-btn');
    const gameContainer = document.querySelector('.game-container');
    const closeBtn = document.getElementById('close-game');


    // --- GAME STATE ---
    let score = 0;
    let timer;
    let timeLeft;
    let correctAnswer;

    // --- GAME SETTINGS ---
    const params = new URLSearchParams(window.location.search);
    const settings = {
        name: params.get('name') || 'Player',
        type: params.get('type') || 'add',
        max: parseInt(params.get('max')) || 20,
        duration: parseInt(params.get('duration')) || 60,
    };

    // Persist last used settings as a convenience
    try {
        localStorage.setItem('mathWhizLastSettings', JSON.stringify(settings));
    } catch (_) {
        // ignore storage errors
    }
    timeLeft = settings.duration;

    // A unique key for localStorage based on game settings
    const highScoreKey = `mathWhizHighScore-${settings.type}-${settings.max}-${settings.duration}`;


    // --- FUNCTIONS ---

    /**
     * Generates a random integer between min and max (inclusive)
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a new math problem based on game settings
     */
    function generateProblem() {
        let num1 = getRandomInt(1, settings.max);
        let num2 = getRandomInt(1, settings.max);
        
        switch (settings.type) {
            case 'add':
                correctAnswer = num1 + num2;
                operatorEl.textContent = '+';
                break;
            case 'subtract':
                // Ensure the result is not negative
                if (num1 < num2) {
                    [num1, num2] = [num2, num1]; // Swap numbers
                }
                correctAnswer = num1 - num2;
                operatorEl.textContent = '-';
                break;
            case 'multiply':
                // Keep numbers small for multiplication to be manageable
                num1 = getRandomInt(1, Math.min(settings.max, 12));
                num2 = getRandomInt(1, Math.min(settings.max, 12));
                correctAnswer = num1 * num2;
                operatorEl.textContent = '×';
                break;
            case 'divide':
                // Create a problem with a whole number answer
                const divisor = getRandomInt(2, Math.min(settings.max, 12));
                const quotient = getRandomInt(2, Math.min(settings.max, 12));
                num1 = divisor * quotient;
                num2 = divisor;
                correctAnswer = quotient;
                operatorEl.textContent = '÷';
                break;
        }

        num1El.textContent = num1;
        num2El.textContent = num2;
        answerInput.value = '';
        answerInput.focus();
    }

    /**
     * Checks the user's answer
     */
    function checkAnswer(e) {
        if (e.key === 'Enter') {
            const userAnswer = parseInt(answerInput.value);
            if (userAnswer === correctAnswer) {
                score++;
                scoreEl.textContent = score;
                playAnimation('correct-animation');
                generateProblem();
            } else {
                playAnimation('incorrect-animation');
                answerInput.value = '';
                answerInput.focus();
            }
        }
    }
    
    /**
     * Applies a CSS animation class to the game container
     */
    function playAnimation(className) {
        gameContainer.classList.add(className);
        gameContainer.addEventListener('animationend', () => {
            gameContainer.classList.remove(className);
        }, { once: true });
    }

    /**
     * Starts the game timer and updates the UI
     */
    function startGameTimer() {
        timeLeftEl.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timeLeftEl.textContent = timeLeft;
            const timePercentage = (timeLeft / settings.duration) * 100;
            timerBarEl.style.width = `${timePercentage}%`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    /**
     * Ends the game and shows the final score
     */
    function endGame() {
        gameArea.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
        finalPlayerNameEl.textContent = settings.name;
        finalScoreEl.textContent = score;

        const currentHighScore = parseInt(localStorage.getItem(highScoreKey)) || 0;
        if (score > currentHighScore) {
            localStorage.setItem(highScoreKey, score);
            newHighScoreMessage.classList.remove('hidden');
        }
    }
    
    /**
     * Initializes the game UI
     */
    function initializeUI() {
        playerNameEl.textContent = settings.name;
        const currentHighScore = localStorage.getItem(highScoreKey) || 0;
        highScoreEl.textContent = currentHighScore;
        scoreEl.textContent = score;
    }

    // --- EVENT LISTENERS ---
    answerInput.addEventListener('keydown', checkAnswer);
    restartBtn.addEventListener('click', () => {
        window.location.reload();
    });
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    // --- START GAME ---
    initializeUI();
    generateProblem();
    startGameTimer();
});