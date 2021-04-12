const express = require('express')
const userData = require('../modules/users')
const lobbyRoute = express.Router()

lobbyRoute.use( (req, res) => {
    console

    const user = req.body.username
    const gym = req.body.gym
    const gender = req.body.gender

    const users = userData.getUsersInGym(gym)

    console.log(users.id)

    const user_info = {
        username: user,
        users,
        gymName: gym,
        gender,
    }

    res.render(`${gym}`, {
        user_info
    })
})

module.exports = lobbyRoute