require("dotenv").config()
require('module-alias/register')

const port = process.env.PORT || 3000
const express = require('express')
const exphbs = require('express-handlebars')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const router = {
    login: require('@routes/login'),
    lobby: require('@routes/lobby'),
    battle: require('@routes/battle'),
}

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main'
})

app.use(express.static(path.join(__dirname + "/public")))

// template engine 
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')


// Navigation

app.get('/', router.login)

    

// starting up the server
app.listen(port, () => console.log(`App now listening on port ${port}`))

