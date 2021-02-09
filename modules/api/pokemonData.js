const fetcher = require('./fetcher')

exports.pokemons = async () => {
    const pokemonList = await fetcher.get(`https://pokeapi.co/api/v2/pokemon/ditto`)
    return pokemonList
}