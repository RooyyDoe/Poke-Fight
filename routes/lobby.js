const express = require('express')
// const users = require('../modules/users')
const lobbyRoute = express.Router()

lobbyRoute.use( (req, res) => {
    const user = req.body.username
    const gym = req.body.gym
    const gender = req.body.gender

    const user_info = {
        username: user,
        gymName: gym,
        gender,
    }

    res.render('lobby', {
        user_info
    })
})

module.exports = lobbyRoute