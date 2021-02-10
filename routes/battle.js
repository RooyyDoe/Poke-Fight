const express = require('express')
const battleRoute = express.Router()

battleRoute.use( (req, res) => {
    res.render('battle')
})

module.exports = battleRoute