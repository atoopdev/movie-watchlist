// api key  b86c75a0

// list of searched for movies
let moviesData = []
let myWatchlist = []

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

// -------------------------clear movieslist -----------------------
function clearMoviesList(){
    moviesData = []
    document.getElementById("search-results").innerHTML=`<p class="message">🕵</p>
    <p class="message">...Searching</p>`

}

// -------------search by title: initial list of movies ----------------

async function getMoviesList(searchTerm){
    clearMoviesList()
    let response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b86c75a0&plot=full`, {method: "GET"})
    let data = await response.json()
    console.log("Data: ", data)
    if(data.Response === 'True'){
        for(let i=0;i<data.Search.length;i++){
        // send imdb id for query to get more detailed data
        getMovieInfo(data.Search[i].imdbID)
            }
    }else{
        console.log(data.Error)
        document.getElementById("search-results").innerHTML=`
        <p class="message">⚠️</p>
        <p class="message error">${data.Error}</p>`
    }
}

// ------------------ get greater movie detail ------------------------

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
        imdbID = idnum.children[2].textContent


        // may not be necessary
        // find movie in array that matches provided id
    //    let result = moviesData.filter(movie=>movie.imdbID === idnum.children[2].textContent)
    //    console.log("result: ", result)

    //    add to watchlist array
       myWatchlist.push(imdbID)
    console.log("Watchlist: ", myWatchlist)  

    // pass myWatchlist array as string to localstorage
    localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))

    console.log("Output from local storage:", localStorage.getItem("myWatchlist"))
        
    
}

