// access localStorage to get array of imdb id's 
let watchList = JSON.parse(localStorage.getItem("myWatchlist"))
console.log("watchList: ", watchList)