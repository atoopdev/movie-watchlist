

// access localStorage to get array of imdb id's 
let watchList = JSON.parse(localStorage.getItem("myWatchlist"))
console.log("watchList: ", watchList)

let outputWatchlist = []

render()

function render(){
    // send each id to getMovieInfo
    for(let i=0;i<watchList.length;i++){
        // send imdb id for query to get more detailed data
        getMovieInfo(watchList[i])
        }
    setTimeout(testOutput, 3000)
    setTimeout(outputMovieHTML, 2000)

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
        <img src="${outputWatchlist[i].Poster}" alt = "Poster of ${outputWatchlist[i].Title}"/>
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

