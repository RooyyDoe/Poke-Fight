const fetcher = require('./fetcher')

const pokemonData = async (query) => {
    const pokemonList = await fetcher.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
    // console.log(pokemonList)
    return pokemonList
}

const pokemonTypeData = async (type) => {
    const typeResources = await fetcher.get(`https://pokeapi.co/api/v2/type/${type}`)
    // console.log(typeResources)
    return typeResources
}

module.exports = {
    pokemonData,
    pokemonTypeData,
}