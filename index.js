var body = document.getElementById("body");
var container = document.getElementById("container");
var search = document.getElementById("search");
var searchdropdown =document.getElementById("search-dropdown");




// Add a click event listener to the list
searchdropdown.addEventListener("click", function (event) {
  var target = event.target;
  if (target.tagName === "A") {
   
    var valueToAdd = target.textContent; // Get the text content of the clicked <a> tag
    document.getElementById("se").value = valueToAdd;
  }
});

search.addEventListener('keyup',function(event){
	event.preventDefault();
	let searchTerm = document.getElementById("se").value;
  fetch('https://www.omdbapi.com/?apikey=297c4211&s=' + searchTerm)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
		searchdropdown.innerHTML='';
		
		if (data && data.Search) {
		  data.Search.forEach(function (item) {
			fetch('https://www.omdbapi.com/?apikey=297c4211&i=' + item.imdbID)
			.then(function (response) {
			  if (!response.ok) {
				throw new Error('Network response was not ok');
			  }
			  return response.json();
			}).then(function(imd){ 
			
			let liEle = document.createElement("li");
			
			
	  
			liEle.innerHTML =`<a class="dropdown-item" href="#">${imd.Title}</a>`
			 
			
			searchdropdown.appendChild(liEle);
		})
		  });
		} else {
		  console.log('No search results found.');
		}
		console.log(data);
	  })
    .catch(function (err) {
      console.warn('Something went wrong:', err);
    });


})

search.addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear previous search results
  container.innerHTML = '';

  let searchTerm = document.getElementById("se").value;
  fetch('https://www.omdbapi.com/?apikey=297c4211&s=' + searchTerm)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
		
		if (data && data.Search) {
		  data.Search.forEach(function (item) {
			fetch('https://www.omdbapi.com/?apikey=297c4211&i=' + item.imdbID)
			.then(function (response) {
			  if (!response.ok) {
				throw new Error('Network response was not ok');
			  }
			  return response.json();
			}).then(function(imd){ 
			
			let cardContainer = document.createElement("div");
			cardContainer.className = "card";
			cardContainer.style = "width: 18rem;";
	  
			cardContainer.innerHTML = `
			
			  <img src="${item.Poster}" class="card-img-top" alt="...">
			  <div class="card-body">
			  <a class="movie card-title" href="./movie.html"  value=${imd.imdbID} >
				${item.Title}</a>
				<p class="card-text">${item.Year}</p>
				<p>${imd.Plot}</p>
				<button class="favorite" value=${imd.imdbID}>+Favorites</button>
				
			  </div>
			`;
			
			container.appendChild(cardContainer);
		})

// 		let favoriteButtons = document.getElementsByClassName("favorite");

// // Convert the HTMLCollection to an array
// let favoriteArray = Array.from(favoriteButtons);
// console.log("Clicked on button:",favoriteButtons);

		
		  });
		} else {
		  console.log('No search results found.');
		}
		console.log(data);
	  })
    .catch(function (err) {
      console.warn('Something went wrong:', err);
    });
});
document.addEventListener("click", function (e) {
	if (e.target.className === "favorite") {
	  let target = e.target;
	  console.log("Clicked on button:", target.className);
	  let value = target.getAttribute("value");
	  localStorage.setItem(value, value);
	} else if (e.target.tagName === "A") {
	  let target = e.target;
	  console.log("Clicked on link:", target.tagName);
	  let value = target.getAttribute("value");
	  localStorage.setItem("movie", value);
	}
	
  });
  

