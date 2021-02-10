const fetcher = require('./fetcher')

const pokemon = async (query) => {
    const pokemonList = await fetcher.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
    console.log(pokemonList)
    return pokemonList
}

module.exports = pokemon