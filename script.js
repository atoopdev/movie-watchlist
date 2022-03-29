// api key  b86c75a0

let moviesData = []

// ---------------------------- grab form data -------------------------------

document.getElementById("movie-title-search").addEventListener("submit", event=>{
    event.preventDefault()
    // console.log("submit")
    const ourFormData = new FormData(event.target)
    const movieTitle = ourFormData.get("movieTitle")
    // console.log("movieTitle: ", movieTitle)
    getMoviesList(movieTitle)
    console.log("Finished moviesData: ", moviesData)
    setTimeout(outputMovies, 3000)
})

// -----------------------------------------------------------------------------

// Send all data requests to:

// http://www.omdbapi.com/?apikey=[yourkey]&

// -------------------------- look up movie title ------------------------------

function getMoviesList(searchTerm){
    
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b86c75a0&plot=full`, {method: "GET"})
    .then(response => response.json())
    .then(data=>{
        
        for(let i=0;i<data.Search.length;i++){
            // send imdb id for query to get more detailed data
           getMovieInfo(data.Search[i].imdbID)
        }
    })
   
}

function getMovieInfo(movie){
    let movieExtData = []
    // send movie id in query to receive more detailed movie info back
    fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b86c75a0`, {method: "GET"})
    .then(response => response.json())
    .then(data =>{
        console.log("Movie data from getMovieInfo: ", data)
        // becomes movie output list
        moviesData.push(data)
    
})
}

function outputMovies(){
    let moviesHTML = ""
    console.log("In outputMovies")
    console.log("moviesData.length: ", moviesData.length)
    for(let i=0;i<moviesData.length;i++){

        moviesHTML += `
        <div class="movie">
        <img src="${moviesData[i].Poster}" alt = "Poster of ${moviesData[i].Title}"/>
        <div class="movie-summary">
        <p class="movie-title">${moviesData[i].Title} <span class="movie-rating">⭐️ ${moviesData[i].Ratings[0].Value}</span></p>
        <p class="movie-details">${moviesData[i].Runtime} ${moviesData[i].Genre} 
        <p class="movieID">${moviesData[i].imdbID}</p>
        <button class="btn addtowatchlist">+ Watchlist</button></p>
        <p class="movie-plot">${moviesData[i].Plot}</p>
        </div>
        </div>`
    }
    console.log("moviesHTML: ", moviesHTML)
    document.getElementById("search-results").innerHTML=moviesHTML
}

let addToWatchlistBTN = document.getElementById("search-results")
addToWatchlistBTN.addEventListener('click', addToMyWatchlist)

function addToMyWatchlist(e){
    console.log("add to watchlist clicked")
    
        let idnum = e.target.parentElement
        // get IMDBIDnum from movie where "+watchlist" clicked
        console.log("idnum: ", idnum.children[2].textContent)
        
    
}