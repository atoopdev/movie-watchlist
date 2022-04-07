

// access localStorage to get array of imdb id's 
let watchList = JSON.parse(localStorage.getItem("myWatchlist"))
// console.log("watchList: ", watchList)

let outputWatchlist = []

render()

function render(){
    // send each id to getMovieInfo
    if(watchList.length!=0)
    {for(let i=0;i<watchList.length;i++){
        // send imdb id for query to get more detailed data
        getMovieInfo(watchList[i])
        }
    // setTimeout(testOutput, 3000)
    setTimeout(outputMovieHTML, 2000)
    }else{
        // console.log("watchlist empty")
        document.getElementById("my-watchlist").innerHTML = `<p class="message"><a href="./index.html">+ Let's add some movies!</a></p>`
    }
}

// function testOutput(){
//     console.log("outputWatchlist[0]", outputWatchlist[0])
//     console.log("outputWatchlist[1]", outputWatchlist[1])
//     console.log("outputWatchlist[2]", outputWatchlist[2])
// }

async function getMovieInfo(movie){
    // send movie id in query to receive more detailed movie info back
    let response = await fetch(`https://www.omdbapi.com/?i=${movie}&apikey=b86c75a0`, {method: "GET"})
    let data = await response.json()
    if(data.Response === 'True'){
        // console.log("Movie data from getMovieInfo: ", data)
        // becomes movie output list
        outputWatchlist.push(data)
        // console.log(`outputwatchlist after push`, outputWatchlist)
    }else{
        // console.log(data.Error)
        document.getElementById("my-watchlist").innerHTML=`
        <p class="message">⚠️</p>
        <p class="message error">${data.Error}</p>`
    }  
    
}

function outputMovieHTML(){
    let displayHTML = ""
    for(let i=0;i<outputWatchlist.length;i++){
        if(outputWatchlist[i].Poster!=`N/A`){
            // console.log("image fine")
        }else{
            // console.log("Missing poster - updating data")
            outputWatchlist[i].Poster = "./missing-poster.jpg"
        }
        if(outputWatchlist[i].Ratings[0]){
            // console.log("Ratings not null")   
            displayHTML += `
                <div class="movie">
                <img class="movie-poster" src="${outputWatchlist[i].Poster}" alt = "Poster of ${outputWatchlist[i].Title}"/>
                <div class="movie-summary">
                <p class="movie-title">${outputWatchlist[i].Title} <span class="movie-rating">⭐️ ${outputWatchlist[i].Ratings[0].Value}</span></p>
                <p class="movie-details">${outputWatchlist[i].Runtime} ${outputWatchlist[i].Genre} 
                <span class="movieID">${outputWatchlist[i].imdbID}</span><button class="icon-btn removeFromWatchlist"><i class="material-icons">do_not_disturb_on</i> Remove</button>
            
                <p class="movie-plot">${outputWatchlist[i].Plot}</p>
                </div>
                </div>`
        }else{
            // console.log("Bad ratings data found - using alternate html")
            displayHTML += `
                <div class="movie">
                <img class="movie-poster" src="${outputWatchlist[i].Poster}" alt = "Poster of ${outputWatchlist[i].Title}"/>
                <div class="movie-summary">
                <p class="movie-title">${outputWatchlist[i].Title} <span class="movie-rating">⭐️ - </span></p>
                <p class="movie-details">${outputWatchlist[i].Runtime} ${outputWatchlist[i].Genre} 
                <span class="movieID">${outputWatchlist[i].imdbID}</span><button class="icon-btn removeFromWatchlist"><i class="material-icons">do_not_disturb_on</i> Remove</button>
            
                <p class="movie-plot">${outputWatchlist[i].Plot}</p>
                </div>
                </div>`
        }
        
    }
    document.getElementById("my-watchlist").innerHTML = displayHTML
}

    let removeBTN = document.getElementById("my-watchlist")
    removeBTN .addEventListener('click', removeFromWatchList)

function removeFromWatchList(e){
    // console.log("remove clicked")
    let currentWatchlist = []
    let idnum = e.target.parentElement
    let movieID = idnum.children[0].textContent
    // get IMDBIDnum from movie where "+watchlist" clicked
    // console.log("idnum: ", movieID)

    // make sure is valid click
    if(movieID.includes("do_not_disturb")){
        // console.log("- icon clicked")
        movieID = idnum.parentElement.children[0].textContent
        // console.log("new movieid: ", movieID)
    }
    if(movieID.includes("tt")){
        // console.log("contains tt")
        // everything goes in here
        currentWatchlist = JSON.parse(localStorage.getItem("myWatchlist"))
        // console.log("Watchlist grabbed from storage: ", currentWatchlist)
        // console.log("currentWatchlist.length: ", currentWatchlist.length)

    // found how to splice here https://love2dev.com/blog/javascript-remove-from-array/
    for(let i=0; i<currentWatchlist.length;i++){
        if(currentWatchlist[i]=== movieID){
            // console.log("value found")
            currentWatchlist.splice(i,1)
            // console.log("currentwatchlist post splice: ", currentWatchlist)
        }
    }
    localStorage.clear()
    watchList = currentWatchlist
    outputWatchlist.length = 0
    localStorage.setItem("myWatchlist", JSON.stringify(watchList))
    // console.log("Output from local storage:", localStorage.getItem("myWatchlist"))
    render()
    }else{
        // console.log("invalid click")
    }
    
}
    
