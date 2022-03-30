// api key  b86c75a0

// list of searched for movies
let moviesData = []
let watchlist = []

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

async function getMoviesList(searchTerm){
    
    let response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b86c75a0&plot=full`, {method: "GET"})
    let data = await response.json()

    for(let i=0;i<data.Search.length;i++){
    // send imdb id for query to get more detailed data
    getMovieInfo(data.Search[i].imdbID)
   
        }
 
}

async function getMovieInfo(movie){
    // send movie id in query to receive more detailed movie info back
    let response = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b86c75a0`, {method: "GET"})
    let data = await response.json()
    
        console.log("Movie data from getMovieInfo: ", data)
        // becomes movie output list
        moviesData.push(data)
}

function outputMovies(){
    let moviesHTML = ""
    console.log("In outputMovies")
    console.log("moviesData.length: ", moviesData.length)
    moviesHTML = outputMovieHTML(moviesData)
    // for(let i=0;i<moviesData.length;i++){

    //     moviesHTML += `
    //     <div class="movie">
    //     <img src="${moviesData[i].Poster}" alt = "Poster of ${moviesData[i].Title}"/>
    //     <div class="movie-summary">
    //     <p class="movie-title">${moviesData[i].Title} <span class="movie-rating">⭐️ ${moviesData[i].Ratings[0].Value}</span></p>
    //     <p class="movie-details">${moviesData[i].Runtime} ${moviesData[i].Genre} 
    //     <p class="movieID">${moviesData[i].imdbID}</p>
    //     <button class="btn addtowatchlist">+ Watchlist</button></p>
    //     <p class="movie-plot">${moviesData[i].Plot}</p>
    //     </div>
    //     </div>`
    // }
    console.log("moviesHTML: ", moviesHTML)
    document.getElementById("search-results").innerHTML=moviesHTML
}

function outputMovieHTML(arr){
    let displayHTML = ""
    for(let i=0;i<arr.length;i++){

        displayHTML += `
        <div class="movie">
        <img src="${arr[i].Poster}" alt = "Poster of ${arr[i].Title}"/>
        <div class="movie-summary">
        <p class="movie-title">${arr[i].Title} <span class="movie-rating">⭐️ ${arr[i].Ratings[0].Value}</span></p>
        <p class="movie-details">${arr[i].Runtime} ${arr[i].Genre} 
        <p class="movieID">${arr[i].imdbID}</p>
        <button class="btn addtowatchlist">+ Watchlist</button></p>
        <p class="movie-plot">${arr[i].Plot}</p>
        </div>
        </div>`
    }
    return displayHTML
}

let addToWatchlistBTN = document.getElementById("search-results")
addToWatchlistBTN.addEventListener('click', addToMyWatchlist)

function addToMyWatchlist(e){
    console.log("add to watchlist clicked")
    
        let idnum = e.target.parentElement
        // get IMDBIDnum from movie where "+watchlist" clicked
        console.log("idnum: ", idnum.children[2].textContent)
        // find movie in array that matches provided id
       let result = moviesData.filter(movie=>movie.imdbID === idnum.children[2].textContent)
       console.log("result: ", result)
    //    add to watchlist array
       watchlist.push(result)
    console.log("Watchlist: ", watchlist)  
        
    
}

