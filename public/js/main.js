import * as utils from './utils/utils.mjs'

const socket = io()

const startButton = document.querySelector(".start-button")
const search_bar = document.getElementById('search')
const search_button = document.getElementById('search-button')
const attackButton = document.getElementById('attack')
const healButton = document.getElementById('heal')
const tooltip = document.querySelector('.tooltip')
const infoElement = document.getElementById('user-info')

// saves userInfo from the login form
const userInfo = {
    username: infoElement.getAttribute('user-name'),
    gym: infoElement.getAttribute('gym-name'),
    gender: infoElement.getAttribute('gender'),
}

// send the just joined user-info to server-side
socket.emit('join-lobby', userInfo)

// When 2 players joined the battle, the start button will be disabled. 
startButton.addEventListener('click', () => {
    startButton.disabled = true
    startButton.style.opacity = '.15'
    startButton.style.cursor = 'default'
})

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

    // checks if the search value is empty or not
    if(search_bar.value) {
        socket.emit('search-results', search_bar.value)
    } else {
        // displays error message
        const errorMessage = document.getElementById('error')

        errorMessage.textContent = 'That is not a Pokémon..'
        errorMessage.style.animation = 'fadeIn 400ms 1 ease-in forwards'

        setTimeout(() => {
            errorMessage.style.animation = 'fadeOut 400ms 1 ease-in forwards'
        }, 1500);
    }
    
    // removes the tooltip whenever a user has searched a pokemon
    tooltip.remove()
})

// gets pokemon data from server-side fetch call
socket.on('return-search-results', (pokemonInfo) => {

    // Error message that comes after the search input is wrong
    if(!pokemonInfo) {
        const errorMessage = document.getElementById('error')

        errorMessage.textContent = 'That is not a Pokémon..'
        errorMessage.style.animation = 'fadeIn 400ms 1 ease-in forwards'

        setTimeout(() => {
            errorMessage.style.animation = 'fadeOut 400ms 1 ease-in forwards'
        }, 1500);

    // runs whenever the search input is correct
    } else {

        const pokemonName = document.getElementById('pokemon-name')
        const pokemonImage = document.getElementById('pokemon-image')
        const pokemonHealth = document.getElementById('health')
        const pokemonType = document.getElementById('type')
        const pokemonWeight = document.getElementById('weight')
        const lobby = document.querySelector('.lobby-container-leftside')
        const battle = document.querySelector('.container-leftside-battle')
        const searchContainer = document.querySelector('.search-container')
        const startButton = document.querySelector('.start-button')
        const errorMessage = document.querySelector('.errorMessage')

        errorMessage.remove()
        searchContainer.remove()
        startButton.disabled = false
        startButton.style.opacity = '1'
        startButton.style.cursor = 'cursor'
        
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

        startButton.addEventListener('click', (event) => {
            event.preventDefault();

            // switches scene's to battle arena
            lobby.classList.add('fade-out')
            battle.classList.add('fade-in')

            // Sends the linked player/pokemon data to the server
            socket.emit('join-battle', newUserData)
        });

    }
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

    // checks who is player 1 and who is player 2
    if(player1 === userInfo.username) {
        pokemonNameP1.textContent = pokemon2.name
        pokemonNameP2.textContent = pokemon1.name
        healthBarP1.value = pokemon1.health
        healthBarP2.value = pokemon2.health
        healthBarP1.max = pokemon1.in_health
        healthBarP2.max = pokemon2.in_health
        yourPokemon.src = pokemon1.sprites.back
        // yourPokemon.style.animation = 'slideInReverse 800ms 1 ease-in forwards'
        yourPokemon.classList.add('fadeInLeft')

        setTimeout(() => {
            yourPokemon.classList.remove('fadeInLeft')
        }, 1500);

        opponentsPokemon.src = pokemon2.sprites.front
        
        opponentsPokemon.classList.add('fadeInRight')

        setTimeout(() => {
            opponentsPokemon.classList.remove('fadeInRight')
        }, 1500);
        
        // opponentsPokemon.style.animation = 'slideIn 800ms 1 ease-in forwards'
        currentHealthP1.textContent = pokemon1.health + ' / ' + pokemon1.in_health
        document.querySelector(".attack-button").disabled = false
        document.querySelector(".heal-button").disabled = false
    } else {
        pokemonNameP1.textContent = pokemon1.name
        pokemonNameP2.textContent = pokemon2.name
        healthBarP1.value = pokemon2.health
        healthBarP2.value = pokemon1.health
        healthBarP1.max = pokemon2.in_health
        healthBarP2.max = pokemon1.in_health
        yourPokemon.src = pokemon2.sprites.back
        yourPokemon.classList.add('fadeInLeft')

        setTimeout(() => {
            yourPokemon.classList.remove('fadeInLeft')
        }, 1500);

        opponentsPokemon.src = pokemon1.sprites.front
        opponentsPokemon.classList.add('fadeInRight')

        setTimeout(() => {
            opponentsPokemon.classList.remove('fadeInRight')
        }, 1500);
        
        currentHealthP1.textContent = pokemon2.health + ' / ' + pokemon2.in_health
        document.querySelector(".attack-button").disabled = true
        document.querySelector(".heal-button").disabled = true
    }
    
})

// fires the on-attack socket from server side when player clicks on the attack button
// ROCKET SIENCE -> https://css-tricks.com/restart-css-animation/
attackButton.addEventListener('click', (event) => {
    event.preventDefault()
    const yourPokemon = document.getElementById('your-pokemon-image')


    // -> removing the class
    yourPokemon.classList.remove("attack");

    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    // Oops! This won't work in strict mode. Thanks Felis Phasma!
    // element.offsetWidth = element.offsetWidth;
    // Do this instead:
    void yourPokemon.offsetWidth;

    // -> and re-adding the class
    yourPokemon.classList.add('attack')

    utils.clearMessages()
    socket.emit('on-attack', userInfo)
}, false)



// fires the on-heal socket from server side when player clicks on the heal button
healButton.addEventListener('click', (event) => {
    event.preventDefault()
    socket.emit('on-heal', userInfo)
    healButton.disabled = true
})

// Checks the health of the pokemons
socket.on('health-checker', (player1, pokemon1, pokemon2, attack) => {

    const healthBarP1 = document.getElementById('health-output-p1')
    const healthBarP2 = document.getElementById('health-output-p2')
    const currentHealthP1 = document.getElementById('current-health-p1')

    // checks who is player 1 and who is player 2
    if(player1 === userInfo.username) {
        
        healthBarP1.value = pokemon1.health
        healthBarP2.value = pokemon2.health  
        currentHealthP1.textContent = pokemon1.health + ' / ' + pokemon1.in_health
    } else {
        healthBarP1.value = pokemon2.health
        healthBarP2.value = pokemon1.health  
        currentHealthP1.textContent = pokemon2.health + ' / ' + pokemon2.in_health
    }

    // if(attack) {
    //     const battleContainer = document.querySelector('.battle-container')
    //     const damageIndicator = document.createElement('p')
    
    //     damageIndicator.id = 'damageIndicator'
    //     damageIndicator.textContent = attack
    //     damageIndicator.classList.add('damage')
    
    //     setTimeout(() => {
    //         damageIndicator.remove()
    //     }, 1500);
    
    //     battleContainer.append(damageIndicator)
    // }

})

// checks which players turn it is
socket.on('turn-checker', (player1, turn_player1, heal_used_player1, heal_used_player2) => {

    // checks who is player 1 and who is player 2
    if(player1 === userInfo.username) {
        // if it is player ones turn the attack button will be enabled
        // when player 1 has not used its heal yet (when heal_used_player1 is false) the heal button will be enabled
        // when player 1 has used its heal, the button will be disabled
        // when it is not player ones turn both buttons will be disabled
        if(turn_player1) {
            document.getElementById('attack').disabled = false
            if(heal_used_player1){
                document.getElementById('heal').disabled = true
            } else {
                document.getElementById('heal').disabled = false
            }
        } else {
            document.getElementById('attack').disabled = true
            document.getElementById('heal').disabled = true
        }
    } else {
        // if it is player ones turn the attack and heal button will be disabled for player two
        // if it is player 2 its turn the attack button will be enabled
        // when player 2 has not used its heal yet (when heal_used_player2 is false) the heal button will be enabled
        // when player 2 has used its heal, the button will be disabled
        if(turn_player1) {
            document.getElementById('attack').disabled = true
            document.getElementById('heal').disabled = true
        } else {
            document.getElementById('attack').disabled = false
            if(heal_used_player2){
                document.getElementById('heal').disabled = true
            } else {
                document.getElementById('heal').disabled = false
            }
        }
    }
})

// checks whenever a user leaves the battle early
socket.on('leave-buster', (users) => {

    console.log('test', users)

    const leaveTitle = document.querySelector('.leave-buster-title')
    const leaveHeadMessage = document.querySelector('.head-leave-buster-message')
    const leaveSubMessage = document.querySelector('.sub-leave-buster-message')
    const leaveScreenOverlay = document.querySelector('.container-leftside-end-screen-back')
    const leaveVictoryScreen = document.querySelector('.container-leftside-leave-buster')
    const searchContainer = document.querySelector('.search-container')
    const tooltip = document.querySelector('.tooltip')

    // whenever there are 2 players in the lobby the end screen will be hidden
    if(users.length === 2 ) {
        leaveScreenOverlay.style.visibility = 'hidden'
        leaveVictoryScreen.style.visibility = 'hidden'
        searchContainer.style.visibility = 'visible'
        tooltip.style.visibility = 'visible'

    // When there is only one player in the battle there will be a automatic victory screen
    // for this player.    
    } else {
        
        leaveScreenOverlay.style.visibility = 'visible'
        leaveVictoryScreen.style.visibility = 'visible'
        tooltip.style.visibility = 'hidden'
        searchContainer.style.visibility = 'hidden'

        leaveTitle.textContent = 'Victory'
        leaveHeadMessage.textContent = "You Have"
        leaveSubMessage.textContent = "won the battle"

        document.querySelector(".attack-button").disabled = true
        document.querySelector(".heal-button").disabled = true
    }

})

// game over state
socket.on('game-over', (player1, pokemon1, pokemon2) => {

    const title = document.querySelector('.end-title')
    const headMessage = document.querySelector('.head-end-message')
    const subMessage = document.querySelector('.sub-end-message')
    const pokemonImage = document.getElementById('end-pokemon')
    const screenOverlay = document.querySelector('.container-leftside-end-screen-back')
    const victoryScreen = document.querySelector('.container-leftside-end-screen')

    screenOverlay.style.visibility = 'visible'
    victoryScreen.style.visibility = 'visible'

    // victory and defeat screen when battle is over
    // checks who is player 1 and who is player 2
    if(player1 === userInfo.username) {
        // if player ones pokemon is below 0 health show defeat screen
        // if player twos pokemon is below 0 health show victory screen
        if(pokemon1.health === 0){
            title.textContent = 'Defeat'
            headMessage.textContent = "Your " + pokemon1.name
            subMessage.textContent = "Has lost the battle"
            pokemonImage.src = pokemon1.sprites.display
            pokemonImage.style.opacity = ".25"
        } else if (pokemon2.health === 0) {
            title.textContent = 'Victory'
            headMessage.textContent = "Your " + pokemon1.name
            subMessage.textContent = "Has won the battle"
            pokemonImage.src = pokemon1.sprites.display
        }
    } else {
        // if player twos pokemon is below 0 health show defeat screen
        // if player ones pokemon is below 0 health show victory screen
        if(pokemon2.health === 0) {
            title.textContent = 'Defeat'
            headMessage.textContent = "Your " + pokemon2.name
            subMessage.textContent = "Has lost the battle"
            pokemonImage.src = pokemon2.sprites.display
            pokemonImage.style.opacity = ".25"
        } else if (pokemon1.health === 0) {
            title.textContent = 'Victory'
            headMessage.textContent = "Your " + pokemon2.name
            subMessage.textContent = "Has won the battle"
            pokemonImage.src = pokemon2.sprites.display
        }
    }

    utils.clearMessages()
    document.querySelector(".attack-button").disabled = true
    document.querySelector(".heal-button").disabled = true

})
