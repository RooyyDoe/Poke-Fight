const data = require('../modules/api/pokemonData')

const battleRoute = async (req, res) => {
    const pokemons = await data.pokemons()
    console.log(pokemons)

    res.render('battle',  {
         pokemons: pokemons.results
    })
}

module.exports = battleRoute