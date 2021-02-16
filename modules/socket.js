// const get = require('./pokemonData')

module.exports = (io) => { 

    io.on("connect", (socket) => {

        // Welcome current user

        socket.emit('message', 'Welcome to poke fight')

        // Broadcast when a user connects

        socket.broadcast.emit('message', 'A user has joined the gym')

        // Runs when client disconnects

        socket.on('disconnect', () => {
            io.emit('message', 'A user has left the chat')
        })
    });

}
