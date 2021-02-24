import * as utils from './utils/utils.mjs'

const socket = io()

// get user name, gym and gender out of the login
// const { username, gym, gender } = Qs.parse(location.search, {
//     ignoreQueryPrefix: true
// })

const infoElement = document.getElementById('user-info')
const userInfo = {
    user: infoElement.getAttribute('user-name'),
    gym: infoElement.getAttribute('gym-name'),
    gender: infoElement.getAttribute('gender')
} 

console.log(userInfo.user, userInfo.gym, userInfo.gender)


socket.emit('joinLobby', userInfo)

// get gym and users

// socket.on('gymUsers', ({gym, users}) => {
     
// })

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