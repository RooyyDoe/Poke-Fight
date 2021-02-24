const express = require('express')
const userData = require('../modules/users')
const lobbyRoute = express.Router()

lobbyRoute.use( (req, res) => {
    const user = req.body.username
    const gym = req.body.gym
    const gender = req.body.gender

    const users = userData.getGymUsers(gym)

    const user_info = {
        username: user,
        users,
        gymName: gym,
        gender,
    }

    console.log('users', users)

    res.render('lobby', {
        user_info
    })
})

module.exports = lobbyRoute