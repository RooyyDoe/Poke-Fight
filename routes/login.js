const express = require('express')
const loginRoute = express.Router()
const userData = require('../modules/users')

loginRoute.use( (req, res) => {

    const gyms = userData.getNumberOfUserInAllGyms()

    console.log('gyms', gyms.pewter_gym)

    res.render('login', {
        gyms
    })
})

module.exports = loginRoute