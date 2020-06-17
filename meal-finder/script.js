const submit = document.getElementById('submit');
const search = document.getElementById('search');
const random = document.getElementById('random');
const mealsEL = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEL = document.getElementById('single-meal');

// search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    //clear single meal
    single_mealEL.innerHTML = '';

    //get search term
    const term = search.value;
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2>There are no search results. Try again!</h2>`;
                } else {
                    mealsEL.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                           <img src="${meal.strMealThumb}" />
                           <div class="meal-info" data-mealID="${meal.idMeal}">
                              <h3>${meal.strMeal}</h3>
                           </div>
                        </div>
                    `).join('');
                }
            });

        //clear search text
        search.value = '';
    } else {
        alert('PLease enter a search term=)')
    }
}


submit.addEventListener('submit', searchMeal)
