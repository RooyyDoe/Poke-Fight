require("dotenv").config()

const socket = require('./modules/socket')

const port = process.env.PORT || 3000
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const router = {
    login: require('./routes/login'),
    lobby: require('./routes/lobby'),
    battle: require('./routes/battle'),
    pickYourPokemon: require('./routes/pickYourPokemon'),
}

// Defining my template engine
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main'
})

//setting up the sockets
socket(io)

// public folder for the assets
app.use(express.static(path.join(__dirname + "/public")))

// template engine 
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// Navigation
app.get('/', router.login)
app.get('/lobby', router.lobby)
app.get('/battle', router.battle)
app.get('/pickYourPokemon', router.pickYourPokemon)

// starting up the server
server.listen(port, () => console.log(`App now listening on port ${port}`))