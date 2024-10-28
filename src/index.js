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
    if (value) {
        element.innerText = value;
    }
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
        const card = createTagClassList('div', false, 'card mt-4')
        const { title, rating, content, by, on } = element

        // title and raging
        const movieNameTag = createTagClassList('p', title, 'text-xl', 'text-red-100')
        const movieNameRaging = createTagClassList('span', rating, 'ml-1')
        movieNameRaging.innerText = ` -  (${rating})`
        movieNameTag.appendChild(movieNameRaging)
        card.appendChild(movieNameTag)

        //content
        const contentTag = createTagClassList('p', content, 'text-gray-400 pt-2 font-thin')
        contentTag.innerText = `${content} (Time:  ${new Intl.DateTimeFormat('en-IN').format(on)})`
        card.appendChild(contentTag)

        // by
        const userName = createTagClassList('p', by, 'text-md')
        card.appendChild(userName)

        movieCardWrapper.appendChild(card)
    })
}
init()
