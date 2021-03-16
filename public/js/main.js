import * as utils from './utils/utils.mjs'

const socket = io()

const infoElement = document.getElementById('user-info')
const userInfo = {
    username: infoElement.getAttribute('user-name'),
    gym: infoElement.getAttribute('gym-name'),
    gender: infoElement.getAttribute('gender'),
}

socket.on('return-search-results', (pokemonInfo) => {

    const pokemonName = document.getElementById('pokemon-name')
    const pokemonImage = document.getElementById('pokemon-image')
    const pokemonHealth = document.getElementById('health')
    const pokemonType = document.getElementById('type')
    const pokemonWeight = document.getElementById('weight')
    // const healthBar = document.getElementById('health-output-you')
    const lobby = document.querySelector('.lobby-container-leftside')
    const battle = document.querySelector('.container-leftside-battle')
    const startButton = document.querySelector('.start-button')
    
    pokemonHealth.innerText = pokemonInfo.health
    pokemonType.innerText = pokemonInfo.type
    pokemonWeight.innerText = pokemonInfo.weight
    pokemonName.innerText = pokemonInfo.name
    pokemonImage.src = pokemonInfo.sprites.display
    // healthBar.value = pokemonInfo.health
    // healthBar.max = pokemonInfo.health

    const newUserData = {
        username: userInfo.username,
        gym: userInfo.gym,
        gender: userInfo.gender,
        pokemon: {
            name: pokemonInfo.name,
            type: pokemonInfo.type,
            sprites: {
                front: pokemonInfo.sprites.front,
                back: pokemonInfo.sprites.back,
            },
            health: pokemonInfo.health,
            in_health: pokemonInfo.health
        }
    }

    startButton.addEventListener('click', (event) => {
        event.preventDefault();

        lobby.classList.add('fade-out')
        battle.classList.add('fade-in')

        socket.emit('battle', newUserData)
    });
})

// const renderTurnMessage = (playerOneTurn) => {
//     if (playerOneTurn) {
//         document.querySelector(".battle-message").textContent = "Your opponent's turn";
//         document.querySelector(".attack-button").disabled = true
//     } else {
//         document.querySelector(".battle-message").textContent = "Your turn";
//         document.querySelector(".attack-button").removeAttribute("disabled")
//     }
// }

const attackButton = document.querySelector('.attack-button')

attackButton.addEventListener('click', (event) => {
    event.preventDefault()
    utils.clearMessages()
    socket.emit('attack', userInfo)
})

const search_bar = document.getElementById('search')
const search_button = document.getElementById('search-button')

search_button.addEventListener("click", () => {
    socket.emit('search-results', search_bar.value)
})

socket.emit('join-lobby', userInfo)

// get gym and users

socket.on('gym-users', users => utils.userList(users, userInfo.username))

socket.on('notification', notification => {
    utils.appendLobbyMessage(notification)  
    // utils.fadeAndRemoveMessage()
})

socket.on('message', message => {
    // if(message) {
    //     document.querySelector(".battle-message").textContent = message;
    // }
    utils.appendGameMessage(message)  
    // utils.clearMessages()
})

socket.on('game-starts', (player1, pokemon1, pokemon2) => {

    console.log(player1)
    console.log(userInfo.username)

    const healthBarP1 = document.getElementById('health-output-p1')
    const healthBarP2 = document.getElementById('health-output-p2')
    const pokemonNameP1 = document.getElementById('opponents-pokemon-name')
    const pokemonNameP2 = document.getElementById('your-pokemon-name')
    const yourPokemon = document.getElementById('your-pokemon-image')
    const opponentsPokemon = document.getElementById('opponents-pokemon-image')

    if(player1 === userInfo.username) {
        pokemonNameP1.innerText = pokemon2.name
        pokemonNameP2.innerText = pokemon1.name
        healthBarP1.value = pokemon1.health
        healthBarP2.value = pokemon2.health
        healthBarP1.max = pokemon1.in_health
        healthBarP2.max = pokemon2.in_health
        yourPokemon.src = pokemon1.sprites.back
        opponentsPokemon.src = pokemon2.sprites.front
    } else {
        pokemonNameP1.innerText = pokemon1.name
        pokemonNameP2.innerText = pokemon2.name
        healthBarP1.value = pokemon2.health
        healthBarP2.value = pokemon1.health
        healthBarP1.max = pokemon2.in_health
        healthBarP2.max = pokemon1.in_health
        yourPokemon.src = pokemon2.sprites.back
        opponentsPokemon.src = pokemon1.sprites.front
    }
    
    document.querySelector(".start-button").disabled = true
})

socket.on('health-checker', (pokemon1, pokemon2) => {

    const healthBarP1 = document.getElementById('health-output-p1')
    const healthBarP2 = document.getElementById('health-output-p2')

    healthBarP1.value = pokemon1.health
    healthBarP2.value = pokemon2.health  
})

socket.on('game-over', () => {
    utils.clearMessages()
    document.querySelector(".attack-button").disabled = true

    // setTimeout(() => {
    //     window.location.href = '/'
    // }, 5000);
})

