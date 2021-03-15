const { joinGymLobby, getCurrentUser, getUsersInGym, userLeave} = require('./users')
const pokemonData = require('./pokemonData')

module.exports = (io) => { 

    let user1 = null
    let user2 = null
    let username1 = null
    let username2 = null


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

            user1 = null
            user2 = null

        })

        socket.on('battle', (client) => {

            console.log(client)

            if(user1) {
                user2 = socket
                username2 = client.username
                pokemon2 = client.pokemon
                user1.emit('message', `The battle starts now! ${username1} starts.`)
                user2.emit('message',  `The battle starts now! ${username1} starts.`)
                // [user1, user2].forEach(s => s.emit('message', `The battle starts now! ${username1} starts.`))
                console.log('pokemon2 health', pokemon2.health)
            } else {
                user1 = socket
                username1 = client.username
                pokemon1 = client.pokemon
                console.log('pokemon1 health', pokemon1.health)
                socket.emit('message', 'Waiting for an opponent..., you are player 1.')
            }

            if(user1 && user2) {
                io.to(client.gym).emit('game-starts')
            }
            // console.log('this is user 1: ', user1, 'this is user 2: ', user2)

        })

        socket.on('attack', (userInfo) => {

            const attack = Math.round((Math.random() * 0.4 + 0.6) * 100)

            if (userInfo.username == username1){
                turn_player1 = true
            } else {
                turn_player1 = false
            }

            let message1 = `Current health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`
            io.to(userInfo.gym).emit(message1)

            if (turn_player1){
                let message2 = `${username1}'s ${pokemon1.name} attacked for ${attack} damage`
                pokemon2.health = pokemon2.health - attack
                let message3 = `New health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`
                user1.emit('message', message2)
                user2.emit('message', message2)
                user1.emit('message', message3)
                user2.emit('message', message3)

                if(pokemon2.health <= 0){
                    io.to(userInfo.gym).emit('game-over')
                    console.log(`${username1} won the battle, better luck next time!`)
                    user1.emit('message', `You have won the battle, congrats and goodluck on the next one`)
                    user2.emit('message', `${username1} won the battle, better luck next time!`)
                }

            } else {
                let message2 = `${username2}'s ${pokemon2.name} attacked for ${attack} damage`
                pokemon1.health = pokemon1.health - attack
                let message3 = `New health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`
                user1.emit('message', message2)
                user2.emit('message', message2)
                user1.emit('message', message3)
                user2.emit('message', message3)

                if(pokemon1.health <= 0){
                    io.to(userInfo.gym).emit('game-over')
                    console.log(`${username2} won the battle, better luck next time!`)
                    user1.emit('message', `${username2} won the battle, better luck next time!`)
                    user2.emit('message', `You have won the battle, congrats and goodluck on the next one`)
                }
            }
            
    
            // if(user1) {
            //     let message = `${userInfo.username}'s ${userInfo.pokemon.name} attacked for 100 damage`
            //     user2 = socket
            //     username2 = client.username
            //     user1.emit('message', `The battle starts now! ${username1} starts.`)
            //     user2.emit('message',  `The battle starts now! ${username1} starts.`)
            //     console.log('username2', username2)
            // } else {
            //     user1 = socket
            //     username1 = client.username
            //     console.log('username1', username1)
            //     socket.emit('message', 'Waiting for an opponent..., you are player 1.')
            // }

        })

        socket.on('search-results', async pokemonName => {
            const data = await pokemonData(pokemonName)
            const pokemonInfo = {
                name: data.name,
                sprites: {
                    display: data.sprites.other.dream_world.front_default,
                    back: data.sprites.back_default,
                    front: data.sprites.front_default
                },
                health: data.stats[0].base_stat * 5,
                type: data.types[0].type.name,
                weight: data.weight
            }

            socket.emit('return-search-results', pokemonInfo)
        }) 

        socket.on('game-messages', message => {
            const user = getCurrentUser(socket.id); 

            io.to(user.gym).emit('message', message);
        })

        // Runs when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id)

            if (user) {
                io.to(user.gym).emit('notification', `${user.username} has left the gym`)

                const users = getUsersInGym(user.gym)
                io.to(user.gym).emit('gym-users', users)
            }

        })
    });


}
