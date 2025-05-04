const   searchBtn = document.querySelector(".search-btn"),
        exploreText = document.querySelector(".start-explore p"),
        moviesContainer = document.querySelector(".movies-container")

let movieHtml = []

// localStorage.getItem(`movie-${movie.dataset.movieId}`)

document.addEventListener("click", (e) => {
    if(e.target.dataset.search) {
        movieSearch()
    }

    if(e.target.dataset.addId) {
        addToWatchlist(e.target.dataset.addId)
    }
})

async function movieSearch() {
    const userInput = document.querySelector("input").value

    if(userInput) {
        movieHtml = []

        const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=3800ab28&s=${userInput}&type=movie`)
        const moviesData = await res.json()
        // console.log(moviesData)
        if(moviesData.Response === "True") {
            const arr = moviesData.Search.map(async movie => {
                const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=3800ab28&t=${movie.Title}&type=movie`)
                return res.json()
            })
            Promise.all(arr)
            .then(movieData => {
                // console.log(movieData)
                movieData.forEach(movie => {
                    // console.log(movie.imdbID)
                    movieHtml.push(
                        `
                        <div class="movie-box d-flex" data-movie-id="${movie.imdbID}">
                            <img class="movie-poster" src="${movie.Poster}" alt="">
                            <div class="movie-details">
                                <div class="head d-flex">
                                    <h3>${movie.Title}</h3>
                                    <div class="rating d-flex">
                                        <img src="imgs/star-icon.png" alt="">
                                        <span>${movie.imdbRating}</span>
                                    </div>
                                </div>
                                <div class="info d-flex">
                                    <div class="runtime">${movie.Runtime}</div>
                                    <div class="genre">${movie.Genre}</div>
                                    <div class="add-to-watchlist d-flex">
                                        <img src="imgs/add-icon.png" alt="" data-add-id="${movie.imdbID}">
                                        <span data-add-id="${movie.imdbID}">Watchlist</span>
                                    </div>
                                </div>
                                <p class="descripation">${movie.Plot}</p>
                            </div>
                        </div>
                    `
                    )
                })
                moviesContainer.innerHTML = ""
                moviesContainer.insertAdjacentHTML( "afterbegin", movieHtml.join(""))
            })
        } else {
            moviesContainer.innerHTML = `
                <div class="start-explore d-flex">
                    <img src="imgs/movie-img.png" alt="">
                    <p>
                        Unable to find what you’re looking for. Please try another search.
                    </p>
                </div>
            `
        }
    } else {
        exploreText.style.color = "red" 
        setTimeout(() => {
            exploreText.style.color = "#2E2E2F" 
        }, 2000)
    }
}

function addToWatchlist(addId) {
    let selectedMovie = document.querySelector(`.movie-box[data-movie-id="${addId}"]`)
    // console.log(selectedMovie)
    localStorage.setItem(`movie-${addId}`, selectedMovie.outerHTML)
    // let myWatchlist = []
    // const movieBox = document.querySelectorAll(".movie-box")

    // movieBox.forEach(movie => {
    //     if(addId === movie.dataset.movieId) { 
    //         // console.log(movie)
    //         localStorage.setItem(`movie-${addId}`, movie)
    //     }
    // })

}
