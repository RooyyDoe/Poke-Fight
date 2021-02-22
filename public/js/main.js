import * as utils from './utils/utils.mjs'

// get user name, gym and gender out of the login
const { username, gym, gender } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, gym, gender)

const socket = io()


socket.on('notification', notification => {
    console.log('test', notification )
    utils.appendMessage(notification)  
    utils.fadeAndRemoveMessage()
})

// const pokemon = require('../../modules/pokemonData')
    
// const search_bar = document.getElementById('search-bar')
// const search_button = document.getElementById('search-button')

// console.log('test')

// search_button.addEventListener("click", () => pokemon(search_bar.value))