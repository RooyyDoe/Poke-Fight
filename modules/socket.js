const { joinGymLobby, getCurrentUser, getUsersInGym, userLeave} = require('./users')

module.exports = (io) => { 

    let waitingPlayer = null

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

        socket.on('battle', () => {

            if(waitingPlayer) {
                [socket, waitingPlayer].forEach(s => s.emit('message', 'Game starts now!'))
                waitingPlayer = null
            } else {
                waitingPlayer = socket
                socket.emit('message', 'Waiting for an apponent...')
            }

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
                io.to(user.gym).emit('gymUsers', users)
            }

        })
    });


}
