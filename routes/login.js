const express = require('express')
const loginRoute = express.Router()

loginRoute.use( (req, res) => {
    res.render('login')
})

module.exports = loginRoute