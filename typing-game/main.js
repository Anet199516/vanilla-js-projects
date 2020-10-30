const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEL = document.getElementById('score');
const timeEL = document.getElementById('time');
const endGameEL = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// update score
function updateScore() {
    score++;
    scoreEL.innerHTML = score;
}

// gameOver
function gameOver() {
    endGameEL.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

    endGameEL.style.display = 'flex';
}

function updateTime() {
    time--;
    timeEL.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);

        //end game
        gameOver();
    }
}

addWordToDOM();

// event listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // clear
        e.target.value = '';

        if (difficulty == 'hard') {
            time +=2;
        } else if (difficulty == 'medium') {
            time += 3;
        } else {
            time+= 5;
        }

        updateTime();
    }
})

// settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

// settings select
settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;

    localStorage.setItem('difficulty', difficulty);
})



