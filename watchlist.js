

// access localStorage to get array of imdb id's 
let watchList = JSON.parse(localStorage.getItem("myWatchlist"))
console.log("watchList: ", watchList)

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
        console.log("watchlist empty")
    }
}

function testOutput(){
    console.log("outputWatchlist[0]", outputWatchlist[0])
        console.log("outputWatchlist[1]", outputWatchlist[1])
        console.log("outputWatchlist[2]", outputWatchlist[2])
}
async function getMovieInfo(movie){
    // send movie id in query to receive more detailed movie info back
    let response = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=b86c75a0`, {method: "GET"})
    let data = await response.json()
    if(data.Response === 'True'){
        console.log("Movie data from getMovieInfo: ", data)
        // becomes movie output list
        outputWatchlist.push(data)
        console.log(`outputwatchlist after push`, outputWatchlist)
    }else{
        console.log(data.Error)
        document.getElementById("my-watchlist").innerHTML=`
        <p class="message">⚠️</p>
        <p class="message error">${data.Error}</p>`
    }  
    
}

function outputMovieHTML(){
    let displayHTML = ""
    for(let i=0;i<outputWatchlist.length;i++){

        displayHTML += `
        <div class="movie">
        <img class="movie-poster" src="${outputWatchlist[i].Poster}" alt = "Poster of ${outputWatchlist[i].Title}"/>
        <div class="movie-summary">
        <p class="movie-title">${outputWatchlist[i].Title} <span class="movie-rating">⭐️ ${outputWatchlist[i].Ratings[0].Value}</span></p>
        <p class="movie-details">${outputWatchlist[i].Runtime} ${outputWatchlist[i].Genre} 
        <p class="movieID">${outputWatchlist[i].imdbID}</p>
        <button class="btn removeFromWatchlist">- Remove</button></p>
        <p class="movie-plot">${outputWatchlist[i].Plot}</p>
        </div>
        </div>`
    }
    document.getElementById("my-watchlist").innerHTML = displayHTML
}

let removeBTN = document.getElementById("my-watchlist")
removeBTN .addEventListener('click', removeFromWatchList)

function removeFromWatchList(e){
console.log("remove clicked")
let currentWatchlist = []
let idnum = e.target.parentElement

// get IMDBIDnum from movie where "+watchlist" clicked
console.log("idnum: ", idnum.children[2].textContent)

currentWatchlist = JSON.parse(localStorage.getItem("myWatchlist"))
console.log("Watchlist grabbed from storage: ", currentWatchlist)
console.log("currentWatchlist.length: ", currentWatchlist.length)

// found how to splice here https://love2dev.com/blog/javascript-remove-from-array/
for(let i=0; i<currentWatchlist.length;i++){
    if(currentWatchlist[i]=== idnum.children[2].textContent){
        console.log("value found")
        currentWatchlist.splice(i,1)
        console.log("currentwatchlist post splice: ", currentWatchlist)
    }
}
localStorage.clear()
watchList = currentWatchlist
outputWatchlist.length = 0
localStorage.setItem("myWatchlist", JSON.stringify(watchList))
console.log("Output from local storage:", localStorage.getItem("myWatchlist"))
render()
}
    