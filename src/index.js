import { getData } from "./data.js";
import { findElementById, createTagClassList, removeChild } from "./utlitise.js";
let sortDesc = false

// main function
function init() {
    const movieData = getData()
    setMovieData(movieData)
    movieCard(movieData)
    handlersF(movieData)
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


// handles sorted
function handlersF(movieData) {
    const sortBtn = document.getElementById('sort-btn')
    sortBtn.addEventListener('click', () => sortF(movieData))

    // group
    const groupBtn = document.getElementById('group-btn')
    groupBtn.addEventListener('click', () => handelGroup(movieData))
}

// sortF
function sortF(movieData) {
    const movieDataFlat = movieData.flat()
    sortDesc = !sortDesc


    const element = document.getElementById('movies-card-wrapper')
    const sortReview = sortDesc
        ? movieDataFlat.toSorted((a, b) => b.rating - a.rating)
        : movieDataFlat.toSorted((a, b) => a.rating - b.rating)

    const sortBtn = document.getElementById('sort-btn')
    sortBtn.innerText = sortDesc ? 'High To Low' : 'Low To High'

    removeChild(element)
    showDataDisplay(sortReview, element)
}


// Handle group
function handelGroup(movieData) {
    const movieDataFlat = movieData.flat()
    const groupData = Object.groupBy(movieDataFlat, ({ title }) => title)

    const keys = Reflect.ownKeys(groupData)
    const wrapper = document.getElementById('movies-card-wrapper')
    removeChild(wrapper)

    keys.forEach(key => {
        const card = createTagClassList('div', false, 'card mt-2')
        const h2 = createTagClassList('h2', key, 'text-2xl')

        const reviews = groupData[key]
        reviews.forEach(review => {
            const p = createTagClassList('p', false, 'text-gray-500')
            p.innerHTML = `
            ❤️ <strong>${review.by} </strong>
             has given
            <strong>${review.rating}</strong>
             with a comment
            <strong>${review.content}</strong>
            `
            card.appendChild(p)
        })

        card.appendChild(h2)
        wrapper.appendChild(card)
    })
}



// display card
function movieCard(movieData) {
    const movieDataFlat = movieData.flat()
    const movieCardWrapper = findElementById('movies-card-wrapper')
    const dateSorted = movieDataFlat.toSorted((a, b) => b.on - a.on)

    showDataDisplay(dateSorted, movieCardWrapper)
}


// show data in display
function showDataDisplay(data, ele) {
    data.map((element) => {
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

        ele.appendChild(card)
    })
}

init()
