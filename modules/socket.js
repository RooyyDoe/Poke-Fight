const { userJoin, getCurrentUser, userLeave, getGymUsers} = require('./users')

module.exports = (io) => { 

    io.on("connect", (socket) => {

        console.log('Socket is connected..')

        socket.on('joinLobby', ({user, gym, gender}) => {

            const userInfo = userJoin(socket.id, user, gym, gender)

            console.log('test', userInfo.user)

            socket.join(userInfo.gym)
            
            // Welcome current user

            socket.emit('notification', 'Welcome to Pokémon Battle Simulator')

            // Broadcast when a user connects

            socket.broadcast.to(userInfo.gym).emit('notification',  `${userInfo.user} has joined the gym`)

            // send users and gym info

            io.to(userInfo.gym).emit('gymUsers', {gym: userInfo.gym, users: getGymUsers(userInfo.gym)})

            // Runs when client disconnects

            socket.on('disconnect', () => {
                const user = userLeave(socket.id)

                if (user) {
                    io.to(userInfo.gym).emit('notification', `${userInfo.user} has left the gym`)
                }

                io.to(userInfo.gym).emit('gymUsers', {gym: userInfo.gym, users: getGymUsers(userInfo.gym)})
            })
        })



    });

}
