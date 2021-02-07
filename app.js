const searchBtn = document.getElementById('searchBtn');
const foodList = document.getElementById('foodList');
const detailsFood = document.getElementById('detailsFood')
const errorHandle = document.getElementById('errorHandle');

// SearchBtn Event Listener
searchBtn.addEventListener('click', function () {
    const inputFood = document.getElementById('inputFood').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFood}`)
        .then(res => res.json())
        .then(data => {
            foodFind(data.meals);
        })

        .catch(err => {
            const uiTemplate = `
                <div class="col-md-4 m-auto bg-danger mt-5 rounded py-3">
                <h3 class="text-white text-center">'This food's name are not valid'</h3>
                </div>
            `;
            errorHandle.innerHTML = uiTemplate;
            detailsFood.innerHTML = "";
            foodList.innerHTML = "";
        })
})

// Find food function and error handle
const foodFind = foods => {
    const inputFood = document.getElementById('inputFood').value;
    if (inputFood === '') {
        const uiTemplate = `
                <div class="col-md-4 m-auto bg-danger mt-5 rounded py-4">
                <h3 class="text-white text-center">'This food's name field are null'</h3>
                </div>
            `;
        errorHandle.innerHTML = uiTemplate;
        detailsFood.innerHTML = "";
        foodList.innerHTML = "";
    }
    else {
        let uiTemplate = "";
        foods.forEach(singleFood => {
             uiTemplate += `
                <div class="col">
                    <div class="card" onclick="foodDetails(${singleFood.idMeal})">
                        <img class="img-fluid" src="${singleFood.strMealThumb}" />
                        <div class="card-body">
                            <h4 class="card-title">${singleFood.strMeal}</h4>
                        </div>
                    </div>
                </div>
            `;
            foodList.innerHTML = uiTemplate;
            errorHandle.innerHTML = '';
        })
    }
}

// function for display food details
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
                       <ul >
                            <li> ${data.meals[0].strIngredient1} </li>
                            <li> ${data.meals[0].strIngredient2} </li>
                            <li> ${data.meals[0].strIngredient3} </li>
                            <li> ${data.meals[0].strIngredient4} </li>
                            <li> ${data.meals[0].strIngredient5} </li>
                       </ul>
                    </div>
                </div>
            </div>
        `;
            detailsFood.innerHTML = uiTemplate;
            errorHandle.innerHTML = '';
        })
}





