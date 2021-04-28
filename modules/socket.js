const { joinGymLobby, getCurrentUser, getNumberOfUserInAllGyms, getUsersInGym, userLeave} = require('./users')
const { pokemonData, pokemonTypeData } = require('./pokemonData')

module.exports = (io) => { 

    let user1_present = false
    let username1 = null
    let turn_player1 = true
    let heal_used_player1 = false
    let heal_used_player2 = false


    io.on("connection", (socket) => {

        socket.on('join-lobby', (client) => {

            // Getting information of the user that joined the lobby
            const userInfo = joinGymLobby(socket.id, client.username, client.gym, client.gender)

            //Joins gym lobby
            socket.join(userInfo.gym)
            
            // Welcome current user
            socket.emit('notification', 'Welcome to Pokémon Battle Simulator')

            // Broadcast when a user connects
            socket.broadcast.to(client.gym).emit('notification', `${client.username} has joined the gym`)

            // send users and gym info
            const users = getUsersInGym(client.gym)
            io.to(client.gym).emit('gym-users', users)

            // sends users data to the `leave-buster` socket to look how many players are in the lobby
            io.to(client.gym).emit('leave-buster', users)

        })

        socket.on('search-results', async input => {
            try {
                    // Processing the search request and obtaining the pokemon data of the requested pokemon
                    const data = await pokemonData(input.toLowerCase())

                    const type = data.types[0].type.name

                    // Taking the type from the pokemon search and get extra information for the damage relations.
                    const typeData = await pokemonTypeData(type)

                    // New object that will have the pokemon data that we need for the battle
                    const pokemonInfo = {
                        name: data.name,
                        damage_relations: {
                            double_damage_from: typeData.damage_relations.double_damage_from.map(type => {
                                return type.name
                            }),
                            double_damage_to: typeData.damage_relations.double_damage_to.map(type => {
                                return type.name
                            }),
                            half_damage_from: typeData.damage_relations.half_damage_from.map(type => {
                                return type.name
                            }),
                            half_damage_to: typeData.damage_relations.half_damage_to.map(type => {
                                return type.name
                            }),
                            no_damage_from: typeData.damage_relations.no_damage_from.map(type => {
                                return type.name
                            }),
                            no_damage_to: typeData.damage_relations.no_damage_to.map(type => {
                                return type.name
                            })
                        },
                        sprites: {
                            display: data.sprites.other.dream_world.front_default,
                            back: data.sprites.back_default,
                            front: data.sprites.front_default
                        },
                        move: data.moves[0].move.name,
                        health: data.stats[0].base_stat * 10,
                        in_health: data.stats[0].base_stat * 10,
                        type: data.types[0].type.name,
                        weight: data.weight
                    }

                    // sends pokemon data to the client-side
                    socket.emit('return-search-results', pokemonInfo)
                } catch(error) {
                    // returns error so that we can have error handling client-side
                    socket.emit('return-search-results', error.message)
                }
        }) 

        socket.on('join-battle', (client) => {

            // second socket that joins the battle will become player 2
            if(user1_present) {
                user2 = socket
                user1_present = false //Reset value for next game
                heal_used_player1 = false // Reset value for next game
                heal_used_player2 = false // Reset value for next game
                turn_player1 = true // Reset value for next game
                username2 = client.username // takes username of player 2
                pokemon2 = client.pokemon // takes pokemon of player 2
                // Whenever player 2 joins the battle it will send all the player data to the client-side
                io.to(user2.id).to(user1.id).emit('message', `The battle starts now! ${username1} starts.`)
                io.to(client.gym).emit('battle-starts', username1, pokemon1, pokemon2, user1_present)
            // first socket that will join the battle becomes player 1
            } else {
                user1 = socket
                user1_present = true 
                username1 = client.username
                pokemon1 = client.pokemon
                user1.emit('message', 'Waiting for an opponent..., you are player 1.')
            }
        })

        socket.on('on-attack', (userInfo) => {

            // Random formula to calculate the damage.
            let attack = Math.round((Math.random() * 0.4 + 0.6) * 100)
            
            if (turn_player1){
                if (pokemon1.damage_relations.double_damage_to.includes(pokemon2.type)){
                    attack = attack * 2
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon1.name} used ${pokemon1.move}, it was super effective!`)
                } else if (pokemon1.damage_relations.half_damage_to.includes(pokemon2.type)){
                    attack = Math.round(attack * 0.5)
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon1.name} used ${pokemon1.move}, it was not very effective..`)
                } else if (pokemon1.damage_relations.no_damage_to.includes(pokemon2.type)){
                    attack = 0
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon1.name} used ${pokemon1.move}, it has no effect!`)
                } else {
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon1.name} used ${pokemon1.move}`)
                }
                pokemon2.health = pokemon2.health - attack

                // if health is <= 0 END GAME!
                if(pokemon2.health <= 0){
                    pokemon2.health = 0
                    io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)
                    io.to(userInfo.gym).emit('game-over', username1, pokemon1, pokemon2)
                    user1.emit('message', `The foe's ${pokemon2.name} fainted!`)
                    user2.emit('message', `${pokemon2.name} fainted!`)
                } else {

                // checks the health of the pokemon after each attack
                io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)

                // Gives the turn to player 2
                turn_player1 = false 

                // checks who's turn it is
                io.to(userInfo.gym).emit('turn-checker', username1, turn_player1, heal_used_player1, heal_used_player2)
                }

            } else {
                if (pokemon2.damage_relations.double_damage_to.includes(pokemon1.type)){
                    attack = attack * 2
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon2.name} used ${pokemon2.move}, it was super effective!`)
                } else if (pokemon2.damage_relations.half_damage_to.includes(pokemon1.type)){
                    attack = Math.round(attack * 0.5)
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon2.name} used ${pokemon2.move}, it was not very effective..`)
                } else if (pokemon2.damage_relations.no_damage_to.includes(pokemon1.type)){
                    attack = 0
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon2.name} used ${pokemon2.move}, it has no effect!`)
                } else {
                    io.to(user1.id).to(user2.id).emit('message', `${pokemon2.name} used ${pokemon2.move}`)
                }
                pokemon1.health = pokemon1.health - attack
            
                if(pokemon1.health <= 0){
                    pokemon1.health = 0
                    io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)
                    io.to(userInfo.gym).emit('game-over', username1, pokemon1, pokemon2)
                    user1.emit('message', `The foe's ${pokemon1.name} fainted!`)
                    user2.emit('message', `${pokemon1.name} fainted!`)
                } else {
                io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)

                // gives back the turn to player 1
                turn_player1 = true

                io.to(userInfo.gym).emit('turn-checker', username1, turn_player1, heal_used_player1, heal_used_player2)
                }
            }
        })

        socket.on('on-heal', (userInfo) => {

            // random formula to add health
            let heal = Math.round((Math.random() * 0.4 + 0.6) * 100)
            // If it is player 1's turn the pokemon of player 1 will be given health back
            if (turn_player1){ 
                pokemon1.health = pokemon1.health + heal
                // When the heal would give a health higher than the initial health, the health is set back to the initial health
                if (pokemon1.health > pokemon1.in_health){
                    pokemon1.health = pokemon1.in_health
                }
                // After using the heal, the heal button will be disabled for player 1
                heal_used_player1 = true
                // After using the heal, the turn is over
                turn_player1 = false
            // If it is player 2's turn the pokemon of player 2 will be given health back
            } else {
                pokemon2.health = pokemon2.health + heal
                // When the heal would give a health higher than the initial health, the health is set back to the initial health
                if (pokemon2.health > pokemon2.in_health){
                    pokemon2.health = pokemon2.in_health
                }
                // After using the heal, the heal button will be disabled for player 2
                heal_used_player2 = true
                // After using the heal, the turn is over
                turn_player1 = true
            }
            // The health and turn system will be updated
            io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)
            io.to(userInfo.gym).emit('turn-checker', username1, turn_player1, heal_used_player1, heal_used_player2)
        })

        socket.on('disconnect', () => {
            // Runs when client disconnects
            const user = userLeave(socket.id)

            if (user) {
                // lobby notification when someone leaves
                io.to(user.gym).emit('notification', `${user.username} has left the gym`)

                // game message when opponent has left
                io.to(user.gym).emit('message', `Your opponent left, start a new battle!`)

                const users = getUsersInGym(user.gym)
                io.to(user.gym).emit('gym-users', users)

                io.to(user.gym).emit('leave-buster', users)
            }
        })
    });
}
