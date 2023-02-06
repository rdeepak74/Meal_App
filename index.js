
  if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}
let datadetails = [];
let search = document.getElementById('search');
let html="";
async function fetchapi(url,value){
    try{
        const response = await fetch(url+value);
        const meal = await response.json();
        return meal;
    }catch{
        console.log("Error 1");
    }

}
var button1id="moredetail";
search.addEventListener('keyup',function(){
    // alert(1);
    let searchval=search.value;
    // let arr=JSON.parse(localStorage.getItem("favouritesList"));
    // console.log(searchval);
    if(searchval){
      
      let url='https://www.themealdb.com/api/json/v1/1/search.php?s=';
    let mealsdata=fetchapi(url,searchval);
    let html="";
    mealsdata.then((data)=>{

        if(data.meals){
          // console.log(data.meals.length);

              for(let i=0;i<data.meals.length;i++){
                  html +=`
            <div class="col-md-4">
                <div class="card mb-3" style="width: 18rem;">
                  <img src="${data.meals[i].strMealThumb}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${data.meals[i].strMeal}</h5>
                    <p class="card-text">${data.meals[i].strCategory}</p>
                    
                    <button type="button" class="btn btn-primary" onclick="showmealdetails(${data.meals[i].idMeal})" data-id="${data.meals[i].idMeal}" >More Details</button>
                    <button type="button" class="btn btn-primary" onclick="myfavouritesaddremove(${data.meals[i].idMeal})"  id="fov${data.meals[i].idMeal}">Favourites</button>
                    
                    <div id="${data.meals[i].idMeal}"></div>
                  </div>
                </div>
                </div>
                `;
              }
          
          
        }else{
          html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                The meal you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("main2").innerHTML=""; 
        document.getElementById("main").innerHTML=html;
    })
    }else{
      document.getElementById("main2").innerHTML=""; 
      document.getElementById("main").innerHTML="";
    }
    
  
})

var flag=1;

//Show detail of meal
function showmealdetails(id){

let url='https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
let mealsdata=fetchapi(url,id);

var modal1 = document.getElementById(id);
// console.log(modal1);

mealsdata.then((data)=>{
//   console.log(data.meals[0]);
          modal1.innerHTML=`<div class="modal fade" tabindex="-1" id="testModal">
          <div class="modal-dialog modal-xl">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">${data.meals[0].strMeal}</h5>
                      <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" onclick="javascript:window.location.reload()"></button>
                  </div>
                  <div class="modal-body">
                  <div style="width: 100%;">
                  <center><img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="..." style="width: 25%;margin: auto;">
                  
                  <p>Category : <span><b>${data.meals[0].strCategory}</b></span> </p>
                  <p>Area : <span><b>${data.meals[0].strArea}</b></span> </p>
                  <p>Instruction : </p>
                  <p><b>${data.meals[0].strInstructions}</b></p>
                  <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-info">Watch Video</a>
                  </center>
                  
                  </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" onclick="javascript:window.location.reload()" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
        </div>`;

        const container = document.getElementById("testModal");
        const modal = new bootstrap.Modal(container);
        if(flag==1){
          // alert(1);
          
                        modal.show();
                        flag=0;
        }else{
          // alert(2);
          modal.hide();
          flag=1;
        }
      })



}

//its adds and remove meals to favourites list
function myfavouritesaddremove(id) {
  let arr=JSON.parse(localStorage.getItem("favouritesList"));
  console.log(arr);
  let contain=false;
  for (let index = 0; index < arr.length; index++) {
      if (id==arr[index]) {
          contain=true;
      }
  }
  if (contain) {
    
      let number = arr.indexOf(id);
      arr.splice(number, 1);
      alert("your meal removed from your favourites list");
  } else {
    
      arr.push(id);
      alert("your meal add your favourites list");
  }
  localStorage.setItem("favouritesList",JSON.stringify(arr));

}


function showFavMealList(){

    // alert(1);
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let qwerty="";
    // qwerty=`<p>test</p>`;
   if(arr.length==0){
    // alert('123');
    qwerty += `
    <div class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">404</span>
                    <div class="mb-4 lead">
                        No meal added in your favourites list.
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById("main").innerHTML=""; 
    document.getElementById("main2").innerHTML=qwerty; 
   }else{
    // alert('234');
    
    for (let index = 0; index < arr.length; index++) {
        let mealsdata=fetchapi(url,arr[index]);
        mealsdata.then((data)=>{
            console.log(data.meals[0].strMeal);
            
            qwerty +=`
            <div class="col-md-4">
                <div class="card mb-3" style="width: 18rem;">
                  <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${data.meals[0].strMeal}</h5>
                    <p class="card-text">${data.meals[0].strCategory}</p>
                    <button type="button" class="btn btn-primary" onclick="showmealdetails(${data.meals[0].idMeal})" data-id="${data.meals[0].idMeal}" >More Details</button>
                    <button type="button" class="btn btn-primary" onclick="myfavouritesaddremove(${data.meals[0].idMeal})"  id="fov${data.meals[0].idMeal}">Favourites</button>
                    
                    <div id="${data.meals[0].idMeal}"></div>
                    
                  </div>
                </div>
                </div>
                `;
                document.getElementById("main").innerHTML=""; 
                document.getElementById("main2").innerHTML=qwerty;
        });
        // console.log(qwerty);
    }
   }
   
  //  document.getElementById("main2").innerHTML=qwerty; 
  
}
var myfov =document.getElementById('myfov');

myfov.addEventListener("click",function(){
    showFavMealList();
});