const showbody = document.querySelector('#post-body-hide')
const viewtext = document.querySelector('#show-post-button')
const hidetext = document.querySelector('#hide-post-button')

const showbodyEl = async () => {
    showbody.setAttribute('style','display: initial;')
    viewtext.setAttribute('style','display: none;')
    hidetext.setAttribute('style','display: initial;')
}
const hidebodyEl = async () => {
    showbody.setAttribute('style','display: none;')
    viewtext.setAttribute('style','display: initial;')
    hidetext.setAttribute('style','display: none;')
}


document.querySelector('#show-post-button').addEventListener('click', showbodyEl)
document.querySelector('#hide-post-button').addEventListener('click', hidebodyEl)
