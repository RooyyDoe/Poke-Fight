import * as run from './socket-io/socket'

const socket = io()

run.sockets(socket)

// const pokemon = require('../../modules/pokemonData')
    
// const search_bar = document.getElementById('search-bar')
// const search_button = document.getElementById('search-button')

// console.log('test')

// search_button.addEventListener("click", () => pokemon(search_bar.value))