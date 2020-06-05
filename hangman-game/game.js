const wordEl = document.getElementById('word');
const wrongLettersEL = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// show hidden word
  function displayWord() {
     wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
        )
        .join('')}
  `

    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

     if (innerWord === selectedWord) {
         finalMessage.innerText = 'Congratulations! You won! =)';
         popup.style.display = 'flex';
     }
};

//update wrong letters
  function updateWrongLettersEL() {

      // display wrong letters
    wrongLettersEL.innerHTML = `
        ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ''};
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
      figureParts.forEach((part, index) => {
          const errors = wrongLetters.length;

          if (index < errors) {
              part.style.display = 'block';
          } else {
              part.style.display = 'none';
          }
      })

      //check if lost
      if (wrongLetters.length === figureParts.length) {
          finalMessage.innerText = 'Unfortunately you are lost';
          popup.style.display = 'flex';
      }
}

//show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}


window.addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {

        const letter = event.key;

        if (selectedWord.includes(letter)) {

            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }

        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEL();
            } else {
                showNotification();
            }
        }

    }
})

//restart game
playAgainButton.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEL();

    popup.style.display = 'none';
})

displayWord();
