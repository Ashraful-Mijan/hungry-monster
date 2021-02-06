const searchBtn = document.getElementById('searchBtn');
const foodList = document.getElementById('foodList');
const detailsFood = document.getElementById('detailsFood')
// Search Event Listener
searchBtn.addEventListener('click', function () {
    const inputFood = document.getElementById('inputFood').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFood}`)
        .then(res => res.json())
        .then(data => {
            foodFind(data.meals);   
        })
})

// Find food function
const foodFind = foods => {
    foods.forEach(singleFood => {
        const uiTemplate = `
            <div class="col">
                <div class="card" onclick="foodDetails(${singleFood.idMeal})">
                    <img class="img-fluid" src="${singleFood.strMealThumb}" />
                    <div class="card-body">
                        <h4 class="card-title">${singleFood.strMeal}</h4>
                    </div>
                </div>
            </div>
        `;
        foodList.innerHTML += uiTemplate; 
    })
}

// displayDetails function
const foodDetails = foodId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(res => res.json())
    .then(data => {
        const uiTemplate = `
            <div class="col-md-8 m-auto">
                <div>
                    <img class="img-fluid" src="${data.meals[0].strMealThumb}" />
                    <div class="card-body">
                        <h1 class="card-title">${data.meals[0].strMeal}</h1>
                        <h4 class="card-title">Ingredient</h4>
                        
                         <div >
                         <label >
                           <input class="form-check-input me-1" type="checkbox" checked value="">
                           ${data.meals[0].strIngredient1}
                         </label><br>
                         <label >
                           <input class="form-check-input me-1" type="checkbox" checked value="">
                           ${data.meals[0].strIngredient2}
                         </label><br>
                         <label >
                           <input class="form-check-input me-1" type="checkbox" checked value="">
                           ${data.meals[0].strIngredient3}
                         </label><br>
                         <label >
                           <input class="form-check-input me-1" type="checkbox" checked value="">
                           ${data.meals[0].strIngredient4}
                         </label><br>
                         <label >
                           <input class="form-check-input me-1" type="checkbox" checked value="">
                           ${data.meals[0].strIngredient5}
                         </label><br> 
                       </div>
                    </div>
                </div>
            </div>
        `;
        detailsFood.innerHTML = uiTemplate;
    })
}





