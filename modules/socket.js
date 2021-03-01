const { joinGymLobby, getCurrentUser, getGymUsers, userLeave} = require('./users')

module.exports = (io) => { 

    io.on("connection", (socket) => {

        socket.on('join-lobby', (client) => {

            // Getting information of the user that joined the lobby
            const userInfo = joinGymLobby(socket.id, client.user, client.gym, client.gender)

            //Joins gym lobby
            socket.join(userInfo.gym)
            
            // Welcome current user
            socket.emit('notification', 'Welcome to Pokémon Battle Simulator')

            // Broadcast when a user connects
            socket.broadcast.to(client.gym).emit('notification', `${client.user} has joined the gym`)

            // send users and gym info
            const users = getGymUsers(client.gym)
            io.to(client.gym).emit('gym-users', users)

        })

        socket.on('game-messages', msg => {
            const user = getCurrentUser(socket.id); 

            io.to(user.gym).emit('message', msg);
        })

        // Runs when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id)

            if (user) {
                io.to(user.gym).emit('notification', `${user.user} has left the gym`)

                const users = getGymUsers(user.gym)
                io.to(user.gym).emit('gymUsers', users)
            }

        })
    });

}
