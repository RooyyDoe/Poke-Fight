import * as utils from './utils/utils.mjs'

const socket = io()

const infoElement = document.getElementById('user-info')
const userInfo = {
    user: infoElement.getAttribute('user-name'),
    gym: infoElement.getAttribute('gym-name'),
    gender: infoElement.getAttribute('gender')
} 

socket.emit('joinLobby', userInfo)

// get gym and users

socket.on('gymUsers', users => utils.userList(users, userInfo.user))

socket.on('notification', notification => {
    console.log('test', notification )
    utils.appendMessage(notification)  
    // utils.fadeAndRemoveMessage()
})



// const pokemon = require('../../modules/pokemonData')
    
// const search_bar = document.getElementById('search-bar')
// const search_button = document.getElementById('search-button')

// console.log('test')

// search_button.addEventListener("click", () => pokemon(search_bar.value))