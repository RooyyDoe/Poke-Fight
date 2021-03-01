import * as utils from './utils/utils.mjs'

const socket = io()

const infoElement = document.getElementById('user-info')
const userInfo = {
    user: infoElement.getAttribute('user-name'),
    gym: infoElement.getAttribute('gym-name'),
    gender: infoElement.getAttribute('gender')
} 

const pokemonInfo = {
    name: 'ditto',
    health: 200,
    type: 'normal',
}

if (userInfo && pokemonInfo) {

    const lobby = document.querySelector('.lobby-container-leftside')
    const battle = document.querySelector('.container-leftside-battle')
    const startButton = document.querySelector('.start-button')

    startButton.addEventListener('click', (event) => {
        event.preventDefault();

        lobby.classList.add('fade-out')
        battle.classList.add('fade-in')

        socket.emit('start-battle', userInfo, pokemonInfo)
    });

}

const attackButton = document.querySelector('.attack-button')

attackButton.addEventListener('click', (event) => {
    event.preventDefault();

    let msg = `${userInfo.user}'s ${pokemonInfo.name} attacked for 100 damage`

    msg = msg.trim();

    if (!msg) {
      return false;
    }

    socket.emit('game-messages', msg);
})

socket.emit('join-lobby', userInfo)

// get gym and users

socket.on('gym-users', users => utils.userList(users, userInfo.user))

socket.on('notification', notification => {
    utils.appendLobbyMessage(notification)  
    // utils.fadeAndRemoveMessage()
})

socket.on('message', message => {
    utils.appendGameMessage(message) 
})

// socket.on('start-battle', )

// const pokemon = require('../../modules/pokemonData')
    
// const search_bar = document.getElementById('search-bar')
// const search_button = document.getElementById('search-button')

// console.log('test')

// search_button.addEventListener("click", () => pokemon(search_bar.value))