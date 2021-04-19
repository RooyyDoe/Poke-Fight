require("dotenv").config()
require("@babel/polyfill");

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
}

const ifCond = (arg1, arg2, options) => {
    return (arg1 >= arg2) ? options.fn(this) : options.inverse(this);
}


// Defining my template engine
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        ifCond: ifCond
    }
})

//setting up the sockets
socket(io)

// public folder for the assets
app.use(express.static(path.join(__dirname + "/public")))

// Allowing to send data through URL
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

// starting up the server
server.listen(port, () => console.log(`App now listening on port ${port}`))