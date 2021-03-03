import * as utils from './utils/utils.mjs'

const socket = io()

const infoElement = document.getElementById('user-info')
const userInfo = {
    username: infoElement.getAttribute('user-name'),
    gym: infoElement.getAttribute('gym-name'),
    gender: infoElement.getAttribute('gender'),
    pokemon: {
        name: 'ditto',
        health: 200,
        type: 'normal'
    }
} 

if (userInfo) {

    const lobby = document.querySelector('.lobby-container-leftside')
    const battle = document.querySelector('.container-leftside-battle')
    const startButton = document.querySelector('.start-button')

    startButton.addEventListener('click', (event) => {
        event.preventDefault();

        lobby.classList.add('fade-out')
        battle.classList.add('fade-in')

        socket.emit('battle', userInfo)
    });

}

const renderTurnMessage = () => {
    if (!myTurn) {
        document.querySelector("#messages").textContent = "Your opponent's turn";
        document.querySelector(".attack-button").disabled = true
    } else {
        document.querySelector("#messages").textContent = "Your turn";
        document.querySelector(".attack-button").removeAttribute("disabled")
    }
}

const attackButton = document.querySelector('.attack-button')

// attackButton.addEventListener('click', (event) => {
//     event.preventDefault();

//     let message = `${userInfo.username}'s ${userInfo.pokemon.name} attacked for 100 damage`
//     document.querySelector(".attack-button").disabled = true

//     socket.emit('game-messages', message);
//     socket.emit('game-messages', 'Halloooo');
// })

attackButton.addEventListener('click', (event) => {
    event.preventDefault()
    utils.clearMessages()
    socket.emit('attack', userInfo)
})

socket.emit('join-lobby', userInfo)

// get gym and users

socket.on('gym-users', users => utils.userList(users, userInfo.username))

socket.on('notification', notification => {
    utils.appendLobbyMessage(notification)  
    // utils.fadeAndRemoveMessage()
})

socket.on('message', message => {
    utils.appendGameMessage(message) 
    // utils.clearMessages()
})

// socket.on('start-battle', )

// const pokemon = require('../../modules/pokemonData')
    
// const search_bar = document.getElementById('search-bar')
// const search_button = document.getElementById('search-button')

// console.log('test')

// search_button.addEventListener("click", () => pokemon(search_bar.value))