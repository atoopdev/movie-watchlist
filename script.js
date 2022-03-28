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
    // setTimeout(outputMovies, 3000)
})

// -----------------------------------------------------------------------------

// Send all data requests to:

// http://www.omdbapi.com/?apikey=[yourkey]&

// -------------------------- look up movie title ------------------------------

function getMoviesList(searchTerm){
    
    // start with hard coded title
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b86c75a0&plot=full`, {method: "GET"})
    .then(response => response.json())
    .then(data=>{
        // console.log("Movie data: ", data)
        // console.log("title 0: ", data.Search[0])
        for(let i=0;i<data.Search.length;i++){
            // moviesIMDB.push(data.Search[i].imdbID)
           getMovieInfo(data.Search[i].imdbID)
        }
    })
   
}

function getMovieInfo(movie){
    let movieExtData = []
fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b86c75a0`, {method: "GET"})
.then(response => response.json())
.then(data =>{
    console.log("Movie data from getMovieInfo: ", data)
    moviesData.push(data)
    // console.log("MoviesData", moviesData)
    
})
}

function outputMovies(){
    let moviesHTML = ""
    for(let i=0;i<movies.length;i++){

        // console.log(movies[i].Title)
        // moviesHTML += `
        // <div>
        // <h2>Title: ${movies[i].Title}</h2>
        // <img src="${movies[i].Poster}" alt = "Poster of ${movies[i].Title}"/>
        // </div>`
    }
    console.log("moviesHTML: ", moviesHTML)
    document.getElementById("search-results").innerHTML=moviesHTML
}

