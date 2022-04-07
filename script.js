// api key  b86c75a0

// list of searched for movies
let moviesData = []
const searchForm = document.getElementById("movie-title-search")

// ---------------------------- grab form data -------------------------------

searchForm.addEventListener("submit", event=>{
    event.preventDefault()
    // console.log("submit")
    const ourFormData = new FormData(event.target)
    const movieTitle = ourFormData.get("movieTitle")
    // console.log("movieTitle: ", movieTitle)
    getMoviesList(movieTitle)
    // console.log("Finished moviesData: ", moviesData)
    setTimeout(outputMovies, 3000)
    searchForm.reset()
})

// -----------------------------------------------------------------------------

// Send all data requests to:

// http://www.omdbapi.com/?apikey=[yourkey]&

// -------------------------- look up movie title ------------------------------

// -------------------------clear movieslist -----------------------
function clearMoviesList(){
    moviesData = []
    document.getElementById("search-results").innerHTML=`<p class="message icon">🕵</p>
    <p class="message">...Searching</p>`

}

// -------------search by title: initial list of movies ----------------

async function getMoviesList(searchTerm){
    clearMoviesList()
    let response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=b86c75a0&plot=full`, {method: "GET"})
    let data = await response.json()
    // console.log("Data: ", data)
    if(data.Response === 'True'){
        for(let i=0;i<data.Search.length;i++){
        // send imdb id for query to get more detailed data
        getMovieInfo(data.Search[i].imdbID)
            }
    }else{
        // console.log(data.Error)
        document.getElementById("search-results").innerHTML=`
        <p class="message icon">⚠️</p>
        <p class="message error">${data.Error}</p>`
    }
}

// ------------------ get greater movie detail ------------------------

async function getMovieInfo(movie){
    // send movie id in query to receive more detailed movie info back
    let response = await fetch(`https://www.omdbapi.com/?i=${movie}&apikey=b86c75a0`, {method: "GET"})
    let data = await response.json()
    
        // console.log("Movie data from getMovieInfo: ", data)
        // becomes movie output list
        moviesData.push(data)
}

function outputMovies(){
    let moviesHTML = ""
    // console.log("In outputMovies")
    // console.log("moviesData.length: ", moviesData.length)
    moviesHTML = outputMovieHTML(moviesData)
    // console.log("moviesHTML: ", moviesHTML)
    document.getElementById("search-results").innerHTML=moviesHTML
}


function outputMovieHTML(arr){
    let displayHTML = ""
    for(let i=0;i<arr.length;i++){
        // console.log(`About to output to html: ${arr[i].Poster} ${arr[i].Title} ${arr[i].Ratings[0].Value} ${arr[i].Runtime} ${arr[i].Genre} ${arr[i].imdbID} ${arr[i].Plot}`)
        if(arr[i].Poster!=`N/A`){
            // console.log("image fine")
        }else{
            // console.log("Missing poster - updating data")
            arr[i].Poster = "./missing-poster.jpg"
        }
        if(arr[i].Ratings[0]){
            // console.log("Ratings not null")
            displayHTML += `
            <div class="movie">
            <img class="movie-poster" src="${arr[i].Poster}" alt = "Poster of ${arr[i].Title}"/>
            <div class="movie-summary">
            <p class="movie-title">${arr[i].Title} <span class="movie-rating">⭐️ ${arr[i].Ratings[0].Value}</span></p>
            <p class="movie-details">${arr[i].Runtime} ${arr[i].Genre} <span class="movieID">${arr[i].imdbID}</span>
            <button class="icon-btn addtowatchlist"><i class="material-icons">add_circle</i> Watchlist</button> </p>
            <p class="movie-plot">${arr[i].Plot}</p>
            
            </div>
            </div>`
        }else{
            // console.log("Bad ratings data found - using alternate html")
            displayHTML += `
            <div class="movie">
            <img class="movie-poster" src="${arr[i].Poster}" alt = "Poster of ${arr[i].Title}"/>
            <div class="movie-summary">
            <p class="movie-title">${arr[i].Title} <span class="movie-rating">⭐️ - </span></p>
            <p class="movie-details">${arr[i].Runtime} ${arr[i].Genre} <span class="movieID">${arr[i].imdbID}</span>
            <button class="icon-btn addtowatchlist"><i class="material-icons">add_circle</i> Watchlist</button> </p>
            <p class="movie-plot">${arr[i].Plot}</p>
            
            </div>
            </div>`
        }
       
    }
    return displayHTML
}

document.getElementById("search-results").addEventListener('click', addToMyWatchlist)

function addToMyWatchlist(e){
    // console.log("add to watchlist clicked")
    let currentWatchlist = []
    let clickedBTN
        let idnum = e.target.parentElement

        // console.log("whole idnum: ", idnum)

        // get IMDBIDnum from movie where "+watchlist" clicked
        // console.log("idnum: ", idnum.children[0].textContent)

        // need to verify is valid
        imdbID = idnum.children[0].textContent
        // console.log("imbdID: ", imdbID)

        // if circle icon clicked - here is movie id and button
        if(imdbID.includes("add_circle")){
            // console.log("add circle clicked")
            imdbID = idnum.parentElement.children[0].textContent
            // console.log("New imbdID: ", imdbID)
            // console.log("desired button: ", idnum.parentElement.children[1])
            clickedBTN = idnum.parentElement.children[1]
        }
        // if button is clicked directly
        else if(imdbID.includes("tt")){
            // console.log("tt found")
            // if works drop everything in here
            clickedBTN = idnum.children[1]
            // console.log("clickedBTN: ", clickedBTN.textContent)
        }else{
            // console.log("bad click - ignore. returning 0")
            return 0
        }
        clickedBTN.textContent = "Added!"
        clickedBTN.style.color = 'red'

        if(localStorage.getItem("myWatchlist")){
            // console.log("watchlist not empty")
            // originally was missing JSON.parse - had to look up solution here https://www.codegrepper.com/code-examples/javascript/localstorage+save+array
            currentWatchlist = JSON.parse(localStorage.getItem("myWatchlist"))
            // currentWatchlist = currentWatchlist ? currentWatchlist.split(',') : []
            // console.log("Existing current watchlist pulled from LS: ", currentWatchlist)
        }

        // see if already in watchlist
        // find movie in array that matches provided id
        // https://www.w3schools.com/jsref/jsref_includes_array.asp#:~:text=The%20includes()%20method%20returns,()%20method%20is%20case%20sensitive.
        if(currentWatchlist.includes(imdbID)){
            // console.log("Movie already in array")
            clickedBTN.textContent = "Already added!"
        }else{
            // console.log("Movie not in array, adding to watchlist")
            //    add to watchlist array
            currentWatchlist.push(imdbID)
            // console.log("Currentwatchlist as array: ", currentWatchlist)
            // console.log("Watchlist: ", currentWatchlist)  
             // pass myWatchlist array as string to localstorage
            localStorage.setItem("myWatchlist", JSON.stringify(currentWatchlist))
            // console.log("Output from local storage:", localStorage.getItem("myWatchlist"))
        }
        

        

   
        
    
}

