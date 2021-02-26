const { joinGymLobby, getGymUsers, userLeave} = require('./users')

module.exports = (io) => { 

    io.on("connection", (socket) => {

        socket.on('joinLobby', ({user, gym, gender}) => {

            // 
            const userInfo = joinGymLobby(socket.id, user, gym, gender)

            //Joins gym lobby
            socket.join(userInfo.gym)
            
            // Welcome current user
            socket.emit('notification', 'Welcome to Pokémon Battle Simulator')

            // Broadcast when a user connects
            socket.broadcast.to(userInfo.gym).emit('notification', `${userInfo.user} has joined the gym`)

            // send users and gym info
            const users = getGymUsers(userInfo.gym)
            io.to(userInfo.gym).emit('gymUsers', users)

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
