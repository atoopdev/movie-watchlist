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

export {outputMovieHTML}