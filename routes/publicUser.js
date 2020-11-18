const express = require('express')
let router = express.Router()
const userService = require('../services/user')

router.post('/login', async (req, res) => {
    let response = await userService.login(req.body)
    res.status(response.status).send(response.data)
})

router.post('/create', async (req, res) => {
    let response = await userService.createUser(req.body)
    res.status(response.status).json(response)
})

module.exports = router