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

// create classlist and value
function createTagClassList(tag, value, classes) {
    const element = document.createElement(tag)
    if (value) {
        element.innerText = value;
    }
    element.classList.add(...classes.split(' '))
    return element
}

// remove child
function removeChild(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild, removeChild)
    }
}


export { findElementById, createTagClassList }