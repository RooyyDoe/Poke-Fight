const fetcher = require('./fetcher')

const pokemonData = async (query) => {
    try {
      const pokemonList = await fetcher.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
      return pokemonList
    } catch(error){
      if(error.message === 'Not Found') throw ('Pokemon not found')
      else throw 'A error happend'
    }
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