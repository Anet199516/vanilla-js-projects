const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// keep track of current card
let currentActiveCard = 0;

// store DOM cards
const cardsEL = [];

// store card data
const cardsData = getCardsData();

// get cards from localStorage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));

    return cards === null ? [] : cards;
}

// add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

// create all cards
function createCards() {
    cardsData.forEach((card, index) => createCard(card, index))
}

// create a single card in DOM
function createCard(data, index) {
     const card = document.createElement('div');
     card.classList.add('card');

     if (index === 0) {
         card.classList.add('active');
     }

     card.innerHTML = `
         <div class="inner-card">
            <div class="inner-card-front">
        <p>${data.question}</p>
        </div>
       <div class="inner-card-back">
        <p>${data.answer}</p>
        </div>
      </div>
     `;

     card.addEventListener('click', () => card.classList.toggle('show-answer'));

     // add to DOM
    cardsEL.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEL.length}`;
}

createCards();

// event listeners

// next button
nextBtn.addEventListener('click', () => {
    cardsEL[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEL.length - 1) {
        currentActiveCard = cardsEL.length - 1;
    }

    cardsEL[currentActiveCard].className = 'card active';

    updateCurrentText();
})


// prev button
prevBtn.addEventListener('click', () => {
    cardsEL[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEL[currentActiveCard].className = 'card active';

    updateCurrentText();
})

// show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = {question, answer};

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
})

// clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();

    cardsContainer.innerHTML = '';
    window.location.reload();
})

