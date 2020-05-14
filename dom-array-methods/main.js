const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUser();

// fetch randon user and add money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// double money
function doubleMoney() {
    data = data.map(item => {
        return {
            ...item,
            money: item.money * 2
        }
    });

    updateDOM();
}

function sortByRichest() {
    data = data.sort((a, b) => b.money - a.money);

    updateDOM();
}

function showMillionaires() {
    data = data.filter(item => item.money > 1000000);

    updateDOM();
}

function calculateWealth() {
    const element = document.createElement('div');
    const total = data.reduce((prev, next) => {
        return prev + next.money;
    }, 0);

    element.innerHTML = `<h3>Total <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(element);
}


//add new obj to data arr
 function addData(obj) {
    data.push(obj);

    updateDOM();
}


//update DOM
 function updateDOM(providedData = data) {
    // clear main div
     main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

     providedData.forEach((item) => {
         const element = document.createElement('div');
         element.classList.add('person');
         element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
         main.appendChild(element);
     })
}

// format money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
