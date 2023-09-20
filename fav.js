var container = document.getElementById("container");

var content = function(){
    container.innerHTML='';
   
   

    // Use the forEach method to iterate through localStorage
    Object.keys(localStorage).forEach(function (key) {
        if(key!="movie"){
      var value = localStorage.getItem(key); // Get the value associated with the key
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
              cardContainer.style = "width: 18rem;";
        
              cardContainer.innerHTML = `
                <img src="${item.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                <a class="movie card-title" href="./movie.html"  value=${item.imdbID} >
                  <p class="card-text">${item.Year}</p>
                  <p>${item.Plot}</p>
                  <button class="delete" value=${item.imdbID}>Delete</button>
                  
                </div>
              `;
              
              container.appendChild(cardContainer);
          
  
  
              
      
          
          
        })
      .catch(function (err) {
        console.warn('Something went wrong:', err);
      });
    }
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
	  } else if (e.target.tagName === "A") {
        let target = e.target;
        console.log("Clicked on link:", target.tagName);
        let value = target.getAttribute("value");
        localStorage.setItem("movie", value);
      }
  });