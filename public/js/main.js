import * as utils from './utils/utils.mjs'

const socket = io()

const search_bar = document.getElementById('search')
const search_button = document.getElementById('search-button')
const attackButton = document.querySelector('.attack-button')
const tooltip = document.querySelector('.tooltip')
const infoElement = document.getElementById('user-info')
const userInfo = {
    username: infoElement.getAttribute('user-name'),
    gym: infoElement.getAttribute('gym-name'),
    gender: infoElement.getAttribute('gender'),
}

// send the just joined user-info to server-side
socket.emit('join-lobby', userInfo)


search_bar.addEventListener("keyup", (event) => {
    event.preventDefault();

    // User will be able to click on "enter" to search a pokemon.
    if (event.keyCode === 13) {
        search_button.click();
        // removes the tooltip whenever a user has searched a pokemon
        tooltip.remove()
    }

    // Shows tooltip when user has not filled in the search bar
    if(search_bar.value === ''){
        tooltip.style.visibility = "visible"
    } else {
        tooltip.style.visibility = "hidden"
    }
})

// sends the search value to the server-side
search_button.addEventListener("click", () => {
    socket.emit('search-results', search_bar.value)
    // removes the tooltip whenever a user has searched a pokemon
    tooltip.remove()
})


// gets pokemon data from server-side fetch call
socket.on('return-search-results', (pokemonInfo) => {

    const pokemonName = document.getElementById('pokemon-name')
    const pokemonImage = document.getElementById('pokemon-image')
    const pokemonHealth = document.getElementById('health')
    const pokemonType = document.getElementById('type')
    const pokemonWeight = document.getElementById('weight')
    const lobby = document.querySelector('.lobby-container-leftside')
    const battle = document.querySelector('.container-leftside-battle')
    const startButton = document.querySelector('.start-button')
    
    pokemonHealth.innerText = pokemonInfo.health
    pokemonType.innerText = pokemonInfo.type
    pokemonWeight.innerText = pokemonInfo.weight
    pokemonName.innerText = pokemonInfo.name
    pokemonImage.src = pokemonInfo.sprites.display

    // new object where I link the player and the pokemon together.
    const newUserData = {
        username: userInfo.username,
        gym: userInfo.gym,
        gender: userInfo.gender,
        pokemon: pokemonInfo
    }

    if(newUserData.pokemon) {
        console.log('Selected a pokemon')
    }

    startButton.addEventListener('click', (event) => {
        event.preventDefault();

        // switches scene's to battle arena
        lobby.classList.add('fade-out')
        battle.classList.add('fade-in')

        // Sends the linked player/pokemon data to the server
        socket.emit('join-battle', newUserData)
    });
})


// get gym and users to make a user-list for each gym.
socket.on('gym-users', users => utils.userList(users, userInfo.username))

// Notification message to show if someone joined or left the lobby
socket.on('notification', notification => {
    utils.appendLobbyMessage(notification)  
    // utils.fadeAndRemoveMessage() <-- don't remove (turn on when end of project)
})

// In this socket all the message that I need to show will be handled
socket.on('message', message => {
    utils.clearMessages()
    utils.appendGameMessage(message)  
})

// Here the game starts and all the battle elements will be generated 
socket.on('battle-starts', (player1, pokemon1, pokemon2) => {

    const healthBarP1 = document.getElementById('health-output-p1')
    const healthBarP2 = document.getElementById('health-output-p2')
    const pokemonNameP1 = document.getElementById('opponents-pokemon-name')
    const pokemonNameP2 = document.getElementById('your-pokemon-name')
    const yourPokemon = document.getElementById('your-pokemon-image')
    const opponentsPokemon = document.getElementById('opponents-pokemon-image')
    const currentHealthP1 = document.getElementById('current-health-p1')
    // const currentHealthP2 = document.getElementById('current-health-p2')

    if(player1 === userInfo.username) {
        pokemonNameP1.textContent = pokemon2.name
        pokemonNameP2.textContent = pokemon1.name
        healthBarP1.value = pokemon1.health
        healthBarP2.value = pokemon2.health
        healthBarP1.max = pokemon1.in_health
        healthBarP2.max = pokemon2.in_health
        yourPokemon.src = pokemon1.sprites.back
        opponentsPokemon.src = pokemon2.sprites.front
        currentHealthP1.textContent = pokemon1.health + ' / ' + pokemon1.in_health
        // currentHealthP2.textContent = pokemon2.health + ' / ' + pokemon2.in_health
    } else {
        pokemonNameP1.textContent = pokemon1.name
        pokemonNameP2.textContent = pokemon2.name
        healthBarP1.value = pokemon2.health
        healthBarP2.value = pokemon1.health
        healthBarP1.max = pokemon2.in_health
        healthBarP2.max = pokemon1.in_health
        yourPokemon.src = pokemon2.sprites.back
        opponentsPokemon.src = pokemon1.sprites.front
        currentHealthP1.textContent = pokemon2.health + ' / ' + pokemon2.in_health
        // currentHealthP2.textContent = pokemon1.health + ' / ' + pokemon1.in_health
        document.querySelector(".attack-button").disabled = true
    }
    
    // When 2 players joined the battle, the start button will be disabled. 
    // document.querySelector(".start-button").disabled = true
})

// fires the on-attack socket from server side when player clicks on the attack button
attackButton.addEventListener('click', (event) => {
    event.preventDefault()
    utils.clearMessages()
    socket.emit('on-attack', userInfo)
})

// Checks the health of the pokemons
socket.on('health-checker', (player1, pokemon1, pokemon2) => {

    const healthBarP1 = document.getElementById('health-output-p1')
    const healthBarP2 = document.getElementById('health-output-p2')
    const currentHealthP1 = document.getElementById('current-health-p1')
    // const currentHealthP2 = document.getElementById('current-health-p2')

    if(player1 === userInfo.username) {
        healthBarP1.value = pokemon1.health
        healthBarP2.value = pokemon2.health  
        currentHealthP1.textContent = pokemon1.health + ' / ' + pokemon1.in_health
        // currentHealthP2.textContent = pokemon2.health + ' / ' + pokemon2.in_health
    } else {
        healthBarP1.value = pokemon2.health
        healthBarP2.value = pokemon1.health  
        currentHealthP1.textContent = pokemon2.health + ' / ' + pokemon2.in_health
        // currentHealthP2.textContent = pokemon1.health + ' / ' + pokemon1.in_health
    }
})

// checks which players turn it is
socket.on('turn-checker', (player1, turn_player1) => {

    if(player1 === userInfo.username) {
        if(turn_player1) {
            document.querySelector(".attack-button").disabled = false
        } else {
            document.querySelector(".attack-button").disabled = true
        }
    } else {
        if(turn_player1) {
            document.querySelector(".attack-button").disabled = true
        } else {
            document.querySelector(".attack-button").disabled = false
        }
    }
})

// game over state
socket.on('game-over', () => {
    utils.clearMessages()
    document.querySelector(".attack-button").disabled = true

    // setTimeout(() => {
    //     window.location.href = '/'
    // }, 5000);
})

