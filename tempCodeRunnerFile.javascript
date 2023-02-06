<div class="modal-header">
                <h1 class="modal-title fs-5"  id="exampleModalLabel">${data.meals[0].strMeal}</h1>
                <button type="button" class="btn-close" data.meals[0]-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <div id="imgdetails">
                <img src="${data.meals[0].strMealThumb}" class="card-img-top img-cover" alt="...">
              </div>
              
                <p>${data.meals[0].strInstructions} </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>