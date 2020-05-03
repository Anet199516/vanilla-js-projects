const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let moviePrice = +movieSelect.value;

populateUiFromLocalStorage();

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedLength = selectedSeats.length;

    count.innerText = selectedLength + '';
    total.innerText = (selectedLength * moviePrice) + '';

    const indexSeats = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(indexSeats));
};

const clearData = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    selectedSeats.forEach(seat => seat.classList.remove('selected'));
}

const setMovieData = (index, value) => {
    localStorage.setItem('movieIndexFromLC', index);
    localStorage.setItem('movieValueFromLC', value);
}


// get data from localstorage and populate UI
function populateUiFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndexLC = localStorage.getItem('movieIndexFromLC');
    if (selectedMovieIndexLC !== null) {
        movieSelect.selectedIndex = selectedMovieIndexLC;
    }
}


//movie selected
movieSelect.addEventListener('change', (e) => {
    moviePrice = +e.target.value;

    updateSelectedCount();
    setMovieData(e.target.selectedIndex, e.target.value);

})

// seats selected event
container.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
        target.classList.toggle('selected');
    }

    updateSelectedCount();

})

// set initial state (count/total)
updateSelectedCount();
