// const get = require('./pokemonData')

module.exports = (io) => { 

    io.on("connect", (socket) => {

        console.log('Socket is connected..')

        // Welcome current user

        socket.emit('notification', 'Welcome to Pokémon Battle Simulator')

        // Broadcast when a user connects

        socket.broadcast.emit('notification', 'A user has joined the gym')

        // Runs when client disconnects

        socket.on('disconnect', () => {
            io.emit('notification', 'A user has left the chat')
        })

    });

}
