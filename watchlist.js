const moviesContainer = document.querySelector('.movies-container')
// console.log(localStorage.getItem(`${localStorage.key(0)}`))
let movieHtml = ""
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('movie-')) {
        movieHtml += localStorage.getItem(key)
    }
}
moviesContainer.innerHTML = ""
moviesContainer.insertAdjacentHTML("afterbegin", movieHtml)

const addToWatchlist = document.querySelectorAll(".add-to-watchlist")
// console.log(addToWatchlist)
addToWatchlist.forEach(add => {
    document.querySelectorAll(".add-to-watchlist img").forEach((img) => {
        img.src = "imgs/remove-icon.png"
    }) 
    document.querySelectorAll(".add-to-watchlist span").forEach((span) => {
        span.textContent = "Remove"
    }) 
    
    add.addEventListener("click", (e) => {
        const addId = e.target.dataset.addId
        // console.log(addId)
        if (e.target.tagName === "IMG") {
            removeFromWatchlist(addId)
        } else if (e.target.tagName === "SPAN") {
            removeFromWatchlist(addId)
        }
    })
})

function removeFromWatchlist(addId) {
    // console.log(addId)
    let selectedMovie = document.querySelector(`.movie-box[data-movie-id="${addId}"]`)
    // console.log(selectedMovie)
    localStorage.removeItem(`movie-${addId}`)
    selectedMovie.remove()

    if(moviesContainer.children.length === 0) {
        moviesContainer.innerHTML = `
            <div class="start-explore d-flex">
                <p>Your watchlist is looking a little empty...</p>
                <a href="index.html">
                    <img src="imgs/add-icon.png" alt="">
                    Let’s add some movies!
                </a>
            </div>
        `
    }
}