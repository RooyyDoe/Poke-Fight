require("dotenv").config()

const socket = require('./modules/socket')
const helper = require('./modules/helper')

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
    defaultLayout: 'main',
    helpers: {
        ifEqual: helper.isEqualHelper
    }
})

//setting up the sockets
socket(io)

// public folder for the assets
app.use(express.static(path.join(__dirname + "/public")))

app.use(
	express.urlencoded({
		extended: true,
	})
)

// template engine 
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// Navigation
app.get('/', router.login)
app.post('/lobby', router.lobby)
app.post('/battle', router.battle)
app.get('/pickYourPokemon', router.pickYourPokemon)

// starting up the server
server.listen(port, () => console.log(`App now listening on port ${port}`))