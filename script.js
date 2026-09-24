// Morse Code Mapping
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.',
    ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '_': '..--.-',
    '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

// Reverse mapping for Morse to text conversion
const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
);

// Translator state
let currentMode = 'text-to-morse';

// Practice game state
let practiceMode = 'decode';
let currentQuestion = null;
let score = 0;
let questionsCount = 0;

// DOM Elements
const translatorInput = document.getElementById('translator-input');
const translatorOutput = document.getElementById('translator-output');
const translateBtn = document.getElementById('translate-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const swapBtn = document.getElementById('swap-btn');
const exampleBtn = document.getElementById('example-btn');
const statusMessage = document.getElementById('status-message');
const inputLabel = document.getElementById('input-label');
const outputLabel = document.getElementById('output-label');
const modeButtons = document.querySelectorAll('.mode-btn');

// Practice DOM Elements
const practiceModeButtons = document.querySelectorAll('.practice-mode-btn');
const questionText = document.getElementById('question-text');
const morseDisplay = document.getElementById('morse-display');
const answerOptions = document.getElementById('answer-options');
const feedback = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('next-question-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');
const scoreDisplay = document.getElementById('score');
const questionsCountDisplay = document.getElementById('questions-count');

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTranslator();
    initializePractice();
    initializeMobileMenu();
    initializeSmoothScrolling();
});

// Translator Functions
function initializeTranslator() {
    translateBtn.addEventListener('click', handleTranslate);
    clearBtn.addEventListener('click', handleClear);
    copyBtn.addEventListener('click', handleCopy);
    swapBtn.addEventListener('click', handleSwap);
    exampleBtn.addEventListener('click', handleExample);
    
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => handleModeChange(btn.dataset.mode));
    });
}

function handleModeChange(mode) {
    currentMode = mode;
    
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    if (mode === 'text-to-morse') {
        inputLabel.textContent = 'Enter Text';
        outputLabel.textContent = 'Morse Code Output';
        translatorInput.placeholder = 'Enter text to translate...';
        translatorOutput.placeholder = 'Translation will appear here...';
    } else {
        inputLabel.textContent = 'Enter Morse Code';
        outputLabel.textContent = 'Text Output';
        translatorInput.placeholder = 'Enter Morse code (use / for word separation)...';
        translatorOutput.placeholder = 'Translation will appear here...';
    }
    
    // Clear both inputs when switching modes
    translatorInput.value = '';
    translatorOutput.value = '';
    hideStatusMessage();
}

function handleTranslate() {
    const input = translatorInput.value.trim();
    
    if (!input) {
        showStatusMessage('Please enter some text to translate.', 'error');
        return;
    }
    
    let result;
    
    if (currentMode === 'text-to-morse') {
        result = textToMorse(input);
    } else {
        result = morseToText(input);
    }
    
    translatorOutput.value = result;
    showStatusMessage('Translation complete!', 'success');
}

function textToMorse(text) {
    return text.toUpperCase().split('').map(char => {
        if (char === ' ') {
            return '/';
        }
        if (morseCode[char]) {
            return morseCode[char];
        }
        // Skip unsupported characters
        return '';
    }).filter(code => code !== '').join(' ');
}

function morseToText(morse) {
    return morse.split('/').map(word => {
        return word.trim().split(/\s+/).map(code => {
            if (reverseMorseCode[code]) {
                return reverseMorseCode[code];
            }
            return '';
        }).join('');
    }).filter(word => word.length > 0).join(' ');
}

function handleClear() {
    translatorInput.value = '';
    translatorOutput.value = '';
    hideStatusMessage();
}

function handleCopy() {
    const output = translatorOutput.value;
    
    if (!output) {
        showStatusMessage('Nothing to copy.', 'error');
        return;
    }
    
    navigator.clipboard.writeText(output).then(() => {
        showStatusMessage('Copied to clipboard!', 'success');
        setTimeout(hideStatusMessage, 2000);
    }).catch(() => {
        showStatusMessage('Failed to copy to clipboard.', 'error');
    });
}

function handleSwap() {
    const newMode = currentMode === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse';
    handleModeChange(newMode);
    
    // Swap input and output values
    const inputValue = translatorInput.value;
    const outputValue = translatorOutput.value;
    
    translatorInput.value = outputValue;
    translatorOutput.value = inputValue;
}

function handleExample() {
    if (currentMode === 'text-to-morse') {
        translatorInput.value = 'HELLO WORLD';
    } else {
        translatorInput.value = '.... . .-.. .-.. --- / .-- --- .-. .-.. -..';
    }
    handleTranslate();
}

function showStatusMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}

function hideStatusMessage() {
    statusMessage.className = 'status-message';
}

// Practice Game Functions
function initializePractice() {
    practiceModeButtons.forEach(btn => {
        btn.addEventListener('click', () => handlePracticeModeChange(btn.dataset.practiceMode));
    });
    
    nextQuestionBtn.addEventListener('click', generateQuestion);
    resetScoreBtn.addEventListener('click', resetScore);
    
    generateQuestion();
}

function handlePracticeModeChange(mode) {
    practiceMode = mode;
    
    practiceModeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.practiceMode === mode);
    });
    
    resetScore();
    generateQuestion();
}

function generateQuestion() {
    hideFeedback();
    
    const letters = Object.keys(morseCode).filter(key => /^[A-Z0-9]$/.test(key));
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    
    if (practiceMode === 'decode') {
        questionText.textContent = 'What letter does this represent?';
        morseDisplay.textContent = morseCode[randomLetter];
        generateDecodeOptions(randomLetter);
    } else {
        questionText.textContent = `What is the Morse code for the letter ${randomLetter}?`;
        morseDisplay.textContent = randomLetter;
        generateEncodeOptions(randomLetter);
    }
    
    currentQuestion = randomLetter;
}

function generateDecodeOptions(correctAnswer) {
    const letters = Object.keys(morseCode).filter(key => /^[A-Z0-9]$/.test(key));
    const options = [correctAnswer];
    
    while (options.length < 4) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    answerOptions.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.dataset.answer = option;
        btn.addEventListener('click', () => checkAnswer(option, correctAnswer));
        answerOptions.appendChild(btn);
    });
}

function generateEncodeOptions(correctAnswer) {
    const letters = Object.keys(morseCode).filter(key => /^[A-Z0-9]$/.test(key));
    const options = [morseCode[correctAnswer]];
    
    while (options.length < 4) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const morseOption = morseCode[randomLetter];
        if (!options.includes(morseOption)) {
            options.push(morseOption);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    answerOptions.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.dataset.answer = option;
        btn.addEventListener('click', () => checkAnswer(option, morseCode[correctAnswer]));
        answerOptions.appendChild(btn);
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    questionsCount++;
    
    const isCorrect = selectedAnswer === correctAnswer;
    
    if (isCorrect) {
        score++;
        showFeedback('Correct! Well done!', 'correct');
    } else {
        showFeedback(`Incorrect. The correct answer was ${correctAnswer}.`, 'incorrect');
    }
    
    updateScoreDisplay();
    
    // Disable all answer buttons
    const answerButtons = answerOptions.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.answer === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.dataset.answer === selectedAnswer && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
}

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

function hideFeedback() {
    feedback.className = 'feedback';
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
    questionsCountDisplay.textContent = questionsCount;
}

function resetScore() {
    score = 0;
    questionsCount = 0;
    updateScoreDisplay();
    hideFeedback();
    generateQuestion();
}

// Mobile Menu Functions
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

function toggleMobileMenu() {
    nav.classList.toggle('active');
    const isExpanded = nav.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}