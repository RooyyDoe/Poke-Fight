const { joinGymLobby, getCurrentUser, getUsersInGym, userLeave} = require('./users')

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

        })

        socket.on('battle', (client) => {

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

        })

        socket.on('attack', (userInfo) => {
            if (userInfo.username == username1){
                turn_player1 = true
            } else {
                turn_player1 = false
            }
            let message1 = `Current health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`
            user1.emit('message', message1)
            user2.emit('message', message1)

            if (turn_player1){
                let message2 = `${username1}'s ${pokemon1.name} attacked for 100 damage`
                pokemon2.health = pokemon2.health - 100
                let message3 = `New health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`
                user1.emit('message', message2)
                user2.emit('message', message2)
                user1.emit('message', message3)
                user2.emit('message', message3)
            } else {
                let message2 = `${username2}'s ${pokemon2.name} attacked for 100 damage`
                pokemon1.health = pokemon1.health - 100
                let message3 = `New health pokemon1 ${pokemon1.health}, pokemon2 ${pokemon2.health}`
                user1.emit('message', message2)
                user2.emit('message', message2)
                user1.emit('message', message3)
                user2.emit('message', message3)
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

        socket.on('game-messages', message => {
            const user = getCurrentUser(socket.id); 

            io.to(user.gym).emit('message', message);
            io.to(user2.id).emit('message', 'Test');
        })

        // Runs when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id)

            if (user) {
                io.to(user.gym).emit('notification', `${user.username} has left the gym`)

                const users = getUsersInGym(user.gym)
                io.to(user.gym).emit('gymUsers', users)
            }

        })
    });


}
