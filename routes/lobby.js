const express = require('express')
const lobbyRoute = express.Router()

lobbyRoute.use( (req, res) => {
    res.render('lobby')
})

module.exports = lobbyRoute