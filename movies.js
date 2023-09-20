var container = document.getElementById("container");

var content = function(){
    container.innerHTML='';
   
   

      var value = localStorage.getItem("movie"); // Get the value associated with the key
      console.log(value);
      
      fetch('https://www.omdbapi.com/?apikey=297c4211&i=' + value)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function (item) {
        console.log(item);
         
                console.log(item);
              
              let cardContainer = document.createElement("div");
              cardContainer.className = "card";
              
        
              cardContainer.innerHTML = `
               
                <div id="carouselExampleFade" class="carousel slide carousel-fade">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${item.Poster}" class="d-block w-100" alt="...">
          </div>
          
        </div>
        <h5 class="card-title">${item.Title}</h5>
        <p class="card-text">${item.Year}</p>
        <p class="card-text">${item.Rated}</p>
        <p class="card-text">${item.Released}</p>
        <p>${item.Plot}</p>

       
      </div>
              `;
              
              container.appendChild(cardContainer);
          
  
  
              
      
          
          
        })
      .catch(function (err) {
        console.warn('Something went wrong:', err);
      });
      
    


    
    
    

}
content ()
    
document.addEventListener("click", function (e) {
	if (e.target.className === "delete") {
		let target = e.target;
		console.log("delete:", target.getAttribute("value"));
		let value =target.getAttribute("value");
		localStorage.removeItem(value);
        content();
	  }
  });