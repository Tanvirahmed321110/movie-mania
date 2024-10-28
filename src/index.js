import { getData } from "./data.js";

// main function
function init() {
    const movieData = getData()
    setMovieData(movieData)
    movieCard(movieData)
}


// Find Element by Id
function findElementById(id, isCreateElement, value) {
    const item = document.getElementById(id)

    if (isCreateElement) {
        const newItem = document.createElement('span')
        newItem.classList.add('text-3xl')
        newItem.innerText = value;
        item.appendChild(newItem)
    }
    return item
}


function createTagClassList(tag, value, classes) {
    const element = document.createElement(tag)
    element.innerText = value;
    element.classList.add(...classes.split(' '))
    return element
}


// set movie data in display
function setMovieData(movieData) {
    const totalMovie = movieData.length
    const movieDataFlat = movieData.flat()
    const totalReview = movieDataFlat.length
    const totalRating = movieDataFlat.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0)
    const avgRating = (totalRating / totalReview).toFixed(1)

    // tags
    const totalMovieTag = findElementById('total-movie', true, totalMovie)
    const totalReviewTag = findElementById('total-review', true, totalReview)
    const avgReview = findElementById('avg-rating', true, avgRating)
}



function movieCard(movieData) {
    const movieDataFlat = movieData.flat()
    const movieCardWrapper = findElementById('movies-card-wrapper')

    movieDataFlat.map((element) => {
        // const movieName = element.title
        // const raging = element.rating;
        // const review = element.content
        // const by = element.by
        const { title, rating, content, by } = element

        const movieNameTag = createTagClassList('p', title, 'text-xl', 'text-red-100')
        movieNameTag.innerHtml = `<span> - ${rating}</span>`
        console.log(title, rating, content, by)

        // card.appendChild(movieCardWrapper)
    })
}
init()
