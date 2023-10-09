
$(document).ready(function(){

    $(".openbtn").click(function(){
        console.log('hi');
        $(".slide-bar").animate({left:0},500)
        $(".openbtn").hide()
        $(".closebtn").show()
        
    
        for (let i = 0; i < 5; i++) {
            $(".navItem").eq(i).animate({
                top:'0px'
            }, (i) * 150)
        }
    })

    $(".closebtn").click(function(){
        let sliderWidth = $(".slide-nav").innerWidth()
        $(".slide-bar").animate({left:-sliderWidth},500)
        $(".closebtn").hide()
        $(".openbtn").show()
    
    
            $(".navItem").animate({
                top:'300px'
            },200)
    
    })




      
});

function hideLoadingSpinner() {
    $("#loading").fadeOut(1000);
}

//

let allData=[]


function handleSearch() {
    var byName = $("#byName").val();
    var byLetter = $("#byLetter").val();

    if (byName === "" && byLetter === "") {
        getall("");
    } else if (byName === "") {
        console.log(byLetter);
        getall(byLetter);
    } else {
        console.log(byName);
        getall(byName);
    }
}

$("#byName").keyup(function(){
    handleSearch();
});

$("#byLetter").keyup(function(){
    handleSearch();
});


getall("")


function getall(searchKey){
    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            allData=JSON.parse(myRequest.response)
            display(allData)
        }
        hideLoadingSpinner()

    })
    
}

function display(allData){
    const allMealsElement = document.getElementById("allMeals");

    if (!allMealsElement) {
        return;
    }

    allMealsElement.innerHTML = "";
  for(let i=0;i<allData.meals.length;i++)  {
cartona= `  

      <div class="col-md-3">
<div  onClick="getMealDetails(${i})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src=${allData.meals[i].strMealThumb} alt="" >
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${allData.meals[i].strMeal}</h3>
    </div>
</div>
</div>`
document.getElementById("allMeals").innerHTML+=cartona;
}

}



function closeSideNav() {
    let boxWidth = $(".slide-bar").outerWidth()
    $(".slide-bar").animate({
        left: -boxWidth
    }, 500)
}


function getMealDetails(i) {
    $(window).scrollTop(0);
    document.getElementById("home").innerHTML = "";

    let ingredientsList = "";
    for (let j = 1; j <= 20; j++) {
        const ingredient = allData.meals[i][`strIngredient${j}`];
        const measure = allData.meals[i][`strMeasure${j}`];

        if (ingredient && measure) {
            ingredientsList += `
                <li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>
            `;
        }
    }

    cartona2 = `
    <div class="col-md-4">
    <img class="w-100 rounded-3" src=${allData.meals[i].strMealThumb} alt="">
        <h2>${allData.meals[i].strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${allData.meals[i].strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${allData.meals[i].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${allData.meals[i].strCategory}</h3>
    <h3>Recipes :</h3>        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredientsList}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
    <li class="alert alert-danger m-2 p-1">${allData.meals[i].strTags}</li>
        </ul>
    
        <a target="_blank" href="${allData.meals[i].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${allData.meals[i].strYoutube}" class="btn btn-danger">Youtube</a>
    </div></div>
        `;

    document.getElementById("rowData").innerHTML = cartona2;

}

/////////////////////category////////////////////////////////////
allCategory=[]
getCategory()


function getCategory(searchKey){
    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/categories.php`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            allCategory=JSON.parse(myRequest.response)
            displayCategory(allCategory)
        }
        hideLoadingSpinner()

    })
    
}

function displayCategory(allCategory){
    $("#categoryContainer").show();

    const category = document.getElementById("category");

    if (!category) {
        return;
    }

    category.innerHTML = "";

  for(let i=0;i<allCategory.categories.length;i++)  {
cartona= `  

<div class="col-md-3">
<div onclick="getCatMeals('${allCategory.categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src="${allCategory.categories[i].strCategoryThumb}" alt="" srcset="">
    <div class="meal-layer position-absolute text-center text-black p-2">
        <h3>${allCategory.categories[i].strCategory}</h3>
        <p>${allCategory.categories[i].strCategoryDescription}</p>
    </div>
</div>
</div>`
document.getElementById("category").innerHTML+=cartona;
}
}

allCatMeals=[]


function getCatMeals(searchKey){
    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchKey}`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            allCatMeals=JSON.parse(myRequest.response)
            displayCatMeals(allCatMeals)
        }
        hideLoadingSpinner()

    })
    
}


function displayCatMeals(allData){
    $("#categoryContainer").hide();
    document.getElementById("catMeals").innerHTML="";
  for(let i=0;i<allData.meals.length;i++)  {
cartona= `  

      <div class="col-md-3">
<div  onClick="getMealDetailsFromCat('${allData.meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src=${allData.meals[i].strMealThumb} alt="" >
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${allData.meals[i].strMeal}</h3>
    </div>
</div>
</div>`
document.getElementById("catMeals").innerHTML+=cartona;
}

}


function getMealDetailsFromCat(searchKey){

    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchKey}`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            mealInCat=JSON.parse(myRequest.response)
            console.log(mealInCat);
            getdetails(mealInCat)
        }
        hideLoadingSpinner()

    })
}

function getdetails(mealInCat){
    $(window).scrollTop(0);
    document.getElementById("catMeals").innerHTML = "";

    let ingredientsList = "";
    for (let j = 1; j <= 20; j++) {
        const ingredient = mealInCat.meals[0][`strIngredient${j}`];
        const measure = mealInCat.meals[0][`strMeasure${j}`];

        if (ingredient && measure) {
            ingredientsList += `
                <li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>
            `;
        }
    }

    cartona2 = `
    <div class="col-md-4">
    <img class="w-100 rounded-3" src=${mealInCat.meals[0].strMealThumb} alt="">
        <h2>${mealInCat.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${mealInCat.meals[0].strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${mealInCat.meals[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${mealInCat.meals[0].strCategory}</h3>
    <h3>Recipes :</h3>        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredientsList}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
    <li class="alert alert-danger m-2 p-1">${mealInCat.meals[0].strTags}</li>
        </ul>
    
        <a target="_blank" href="${mealInCat.meals[0].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${mealInCat.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div></div>
        `;

    document.getElementById("rowData").innerHTML = cartona2;

}



////////////////area/////////////////////////////
allarea=[]
getarea()


function getarea(){
    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            allarea=JSON.parse(myRequest.response)
            // console.log(allarea.meals[1].strArea);
            displayarea(allarea)
        }
        hideLoadingSpinner()

    })
    
}

function displayarea(allarea){
    // document.getElementById("category").innerHTML="";
  for(let i=0;i<allarea.meals.length;i++)  {
cartona= `  
<div class="col-md-3">
<div onclick="getAreaMeals('${allarea.meals[i].strArea}')" class="rounded-2 text-center text-white cursor-pointer">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${allarea.meals[i].strArea}</h3>
</div>
`
// document.getElementById("area").innerHTML+=cartona;

const area = document.getElementById("area");

if (!area) {
    return;
}

area.innerHTML += cartona;
}
}

allAreaMeals=[]


function getAreaMeals(searchKey){
    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchKey}`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            allAreaMeals=JSON.parse(myRequest.response)
            displayareaMeals(allAreaMeals)
        }
        hideLoadingSpinner()

    })
    
}


function displayareaMeals(allAreaMeals){
    $("#areaContainer").hide();
    document.getElementById("areaMeals").innerHTML="";
  for(let i=0;i<allAreaMeals.meals.length;i++)  {
cartona= `  

      <div class="col-md-3">
<div  onClick="getMealDetailsFromarea('${allAreaMeals.meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src=${allAreaMeals.meals[i].strMealThumb} alt="" >
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${allAreaMeals.meals[i].strMeal}</h3>
    </div>
</div>
</div>`
document.getElementById("areaMeals").innerHTML+=cartona;
}

}


function getMealDetailsFromarea(searchKey){

    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchKey}`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            mealInarea=JSON.parse(myRequest.response)
            console.log(mealInarea);
            getareadetails(mealInarea)
        }
        hideLoadingSpinner()

    })
}

function getareadetails(mealInarea){
    $(window).scrollTop(0);
    document.getElementById("areaMeals").innerHTML = "";

    let ingredientsList = "";
    for (let j = 1; j <= 20; j++) {
        const ingredient = mealInarea.meals[0][`strIngredient${j}`];
        const measure = mealInarea.meals[0][`strMeasure${j}`];

        if (ingredient && measure) {
            ingredientsList += `
                <li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>
            `;
        }
    }

    cartona2 = `
    <div class="col-md-4">
    <img class="w-100 rounded-3" src=${mealInarea.meals[0].strMealThumb} alt="">
        <h2>${mealInarea.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${mealInarea.meals[0].strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${mealInarea.meals[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${mealInarea.meals[0].strCategory}</h3>
    <h3>Recipes :</h3>        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredientsList}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
    <li class="alert alert-danger m-2 p-1">${mealInarea.meals[0].strTags}</li>
        </ul>
    
        <a target="_blank" href="${mealInarea.meals[0].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${mealInarea.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div></div>
        `;

    document.getElementById("rowData").innerHTML = cartona2;

}

/////////////////////ingredients//////////////////////

allingredients=[]
getingredients()


function getingredients(){
    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            allingredients=JSON.parse(myRequest.response)
            console.log(allingredients);
            displayingredients(allingredients)
        }
        hideLoadingSpinner()

    })
    
}

function displayingredients(allingredients){
    // document.getElementById("category").innerHTML="";
  for(let i=0;i<30;i++)  {
cartona= `  
<div class="col-md-3">
                <div onclick="getingredientsMeals('${allingredients.meals[i].strIngredient}')" class="rounded-2 text-center text-white cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${allingredients.meals[i].strIngredient}</h3>
                        <p>is the common name for several species of ray-finned fish in the family Salmonidae. Other fish in the same</p>
                </div>
        </div>
`
const ingredientsElement = document.getElementById("ingredients");

if (!ingredientsElement) {
    return;
}

ingredientsElement.innerHTML += cartona;
}
}

allAreaMeals=[]


function getingredientsMeals(searchKey){
    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchKey}`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            allingredientsMeals=JSON.parse(myRequest.response)
            console.log(allingredientsMeals);
            displayingredientsMeals(allingredientsMeals)
        }
        hideLoadingSpinner()

    })
    
}


function displayingredientsMeals(allingredientsMeals){
    $("#ingredientsContainer").hide();
    document.getElementById("ingredientsMeals").innerHTML="";
  for(let i=0;i<allingredientsMeals.meals.length;i++)  {
cartona= `  

      <div class="col-md-3">
<div  onClick="getMealDetailsFromingredients('${allingredientsMeals.meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img class="w-100" src=${allingredientsMeals.meals[i].strMealThumb} alt="" >
    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${allingredientsMeals.meals[i].strMeal}</h3>
    </div>
</div>
</div>`
document.getElementById("ingredientsMeals").innerHTML+=cartona;
}

}


function getMealDetailsFromingredients(searchKey){

    let myRequest =new XMLHttpRequest;
    myRequest.open("GET",`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchKey}`);
    myRequest.send();
    
    myRequest.addEventListener("readystatechange",function(){
        if(myRequest.readyState==4 && myRequest.status==200){
            mealIningredients=JSON.parse(myRequest.response)
            console.log(mealIningredients);
            getingredientsdetails(mealIningredients)
        }
        hideLoadingSpinner()

    })
}

function getingredientsdetails(mealIningredients){
    $(window).scrollTop(0);
    document.getElementById("ingredientsMeals").innerHTML = "";

    let ingredientsList = "";
    for (let j = 1; j <= 20; j++) {
        const ingredient = mealIningredients.meals[0][`strIngredient${j}`];
        const measure = mealIningredients.meals[0][`strMeasure${j}`];

        if (ingredient && measure) {
            ingredientsList += `
                <li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>
            `;
        }
    }

    cartona2 = `
    <div class="col-md-4">
    <img class="w-100 rounded-3" src=${mealIningredients.meals[0].strMealThumb} alt="">
        <h2>${mealIningredients.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${mealIningredients.meals[0].strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${mealIningredients.meals[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${mealIningredients.meals[0].strCategory}</h3>
    <h3>Recipes :</h3>        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredientsList}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
    <li class="alert alert-danger m-2 p-1">${mealIningredients.meals[0].strTags}</li>
        </ul>
    
        <a target="_blank" href="${mealIningredients.meals[0].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${mealIningredients.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div></div>
        `;

    document.getElementById("rowData").innerHTML = cartona2;

}

/////////////////////////////////////////////////////
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;



submitBtn = document.getElementById("submitBtn")

if(document.getElementById("nameInput")){
document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})
}
if(document.getElementById("emailInput")){
document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})}
if(document.getElementById("phoneInput")){
document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})}
if(document.getElementById("ageInput")){
document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})}
if(document.getElementById("passwordInput")){
document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})}
if(document.getElementById("repasswordInput")){
document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})}

function inputsValidation() {
if (nameInputTouched) {
    if (nameValidation()) {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    } else {
        document.getElementById("nameAlert").classList.replace("d-none", "d-block")

    }
}
if (emailInputTouched) {

    if (emailValidation()) {
        document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
}

if (phoneInputTouched) {
    if (phoneValidation()) {
        document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

    }
}

if (ageInputTouched) {
    if (ageValidation()) {
        document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("ageAlert").classList.replace("d-none", "d-block")

    }
}

if (passwordInputTouched) {
    if (passwordValidation()) {
        document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

    }
}
if (repasswordInputTouched) {
    if (repasswordValidation()) {
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

    }
}


if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
} else {
    submitBtn.setAttribute("disabled", true)
}
}

function nameValidation() {
return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}