const pokemon = require('../../modules/pokemonData')

const search_bar = document.getElementById('search-bar')
const search_button = document.getElementById('search-button')

console.log('test')

search_button.addEventListener("click", () => pokemon(search_bar.value))