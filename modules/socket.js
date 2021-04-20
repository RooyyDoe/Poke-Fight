const { joinGymLobby, getCurrentUser, getNumberOfUserInAllGyms, getUsersInGym, userLeave} = require('./users')
const { pokemonData, pokemonTypeData } = require('./pokemonData')

module.exports = (io) => { 

    let user1_present = false
    let username1 = null
    let username2 = null
    let turn_player1 = true


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

        })

        socket.on('search-results', async input => {

            // Processing the search request and obtaining the pokemon data of the requested pokemon
            const data = await pokemonData(input)

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
                health: data.stats[0].base_stat * 5,
                in_health: data.stats[0].base_stat * 5,
                type: data.types[0].type.name,
                weight: data.weight
            }
            socket.emit('return-search-results', pokemonInfo)
        }) 

        socket.on('game-messages', message => {
            
            // Display game message
            const user = getCurrentUser(socket.id); 

            io.to(user.gym).emit('message', message);
        })

        socket.on('join-battle', (client) => {
            
            const gyms = getNumberOfUserInAllGyms()

            console.log('gyms', gyms.pewter_gym)

            if(user1_present) {
                user2 = socket
                user1_present = false //Reset value for next game
                username2 = client.username
                pokemon2 = client.pokemon
                io.to(user2.id).to(user1.id).emit('message', `The battle starts now! ${username1} starts.`)
                io.to(client.gym).emit('battle-starts', username1, pokemon1, pokemon2)
            } else {
                user1 = socket
                user1_present = true 
                username1 = client.username
                pokemon1 = client.pokemon
                user1.emit('message', 'Waiting for an opponent..., you are player 1.')
            }
        })

        socket.on('on-attack', (userInfo) => {

            let attack = Math.round((Math.random() * 0.4 + 0.6) * 100)
            
            if (turn_player1){
                console.log('userInfo', pokemon2)
                if (pokemon1.damage_relations.double_damage_to.includes(pokemon2.type)){
                    attack = attack * 2
                    console.log('veel')
                } else if (pokemon1.damage_relations.half_damage_to.includes(pokemon2.type)){
                    attack = Math.round(attack * 0.5)
                    console.log('halve damage')
                } else if (pokemon1.damage_relations.no_damage_to.includes(pokemon2.type)){
                    attack = 0
                    console.log('0 damage')
                }
                pokemon2.health = pokemon2.health - attack
    
                io.to(user1.id).to(user2.id).emit('message', `New health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`)
                if(pokemon2.health <= 0){
                    pokemon2.health = 0
                    io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)
                    io.to(userInfo.gym).emit('game-over')
                    user1.emit('message', `You have won the battle, congrats and goodluck on the next one`)
                    user2.emit('message', `${username1} won the battle, better luck next time!`)
                } else {
                io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)
                turn_player1 = false
                io.to(userInfo.gym).emit('turn-checker', username1, turn_player1)
                }

            } else {
                if (pokemon2.damage_relations.double_damage_to.includes(pokemon1.type)){
                    attack = attack * 2
                    console.log('Veel damage')
                } else if (pokemon2.damage_relations.half_damage_to.includes(pokemon1.type)){
                    attack = Math.round(attack * 0.5)
                    console.log('Halve damage')
                } else if (pokemon2.damage_relations.no_damage_to.includes(pokemon1.type)){
                    attack = 0
                    console.log('0 damage')
                }
                pokemon1.health = pokemon1.health - attack
            
                io.to(user1.id).to(user2.id).emit('message', `New health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`)
                if(pokemon1.health <= 0){
                    pokemon1.health = 0
                    io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)
                    io.to(userInfo.gym).emit('game-over')
                    user1.emit('message', `${username2} won the battle, better luck next time!`)
                    user2.emit('message', `You have won the battle, congrats and goodluck on the next one`)
                } else {
                io.to(userInfo.gym).emit('health-checker', username1, pokemon1, pokemon2)
                turn_player1 = true
                io.to(userInfo.gym).emit('turn-checker', username1, turn_player1)
                }
            }
        })

        socket.on('disconnect', () => {
            // Runs when client disconnects
            const user = userLeave(socket.id)

            if (user) {
                io.to(user.gym).emit('notification', `${user.username} has left the gym`)

                const users = getUsersInGym(user.gym)
                io.to(user.gym).emit('gym-users', users)
            }
        })
    });
}
