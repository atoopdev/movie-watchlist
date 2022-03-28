// api key  b86c75a0

// ---------------------------- grab form data -------------------------------

document.getElementById("movie-title-search").addEventListener("submit", event=>{
    event.preventDefault()
    console.log("submit")
    const ourFormData = new FormData(event.target)
    const movieTitle = ourFormData.get("movieTitle")
    console.log("movieTitle: ", movieTitle)
    getMovies(movieTitle)
})

// -----------------------------------------------------------------------------

// Send all data requests to:

// http://www.omdbapi.com/?apikey=[yourkey]&

// -------------------------- look up movie title ------------------------------

function getMovies(searchTerm){
    // start with hard coded title
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b86c75a0`, {method: "GET"})
    .then(response => response.json())
    .then(data=>{
        console.log("Movie data: ", data)
    })
}