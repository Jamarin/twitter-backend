const express = require('express')
let router = express.Router()
const userService = require('../services/user')
const {authenticateToken} = require("../middlewares/jwt");

router.get('/verify', authenticateToken, (req, res) => {
    res.status(200).send('token verified')
})

router.get('/username/:username', authenticateToken, async (req, res) => {
    let username = req.params.username
    let response = await userService.getUserByUsername(username)
    res.send(JSON.stringify(response))
})

router.get('/email/:email', authenticateToken, async (req, res) => {
    let email = req.params.email
    let response = await userService.getUserByUsername(email)
    res.send(JSON.stringify(response))
})

router.post('/login', async (req, res) => {
    let response = await userService.login(req.body)
    res.status(response.status).send(response.data)
})

router.post('/create', async (req, res) => {
    let response = await userService.createUser(req.body)
    res.json(response)
})

router.put('/follow/', async (req, res) => {
    let userFollowing = req.body.userFollowing
    let userFollowed = req.body.userFollowed

})

router.put('/unfollow/', async (req, res) => {
    let userUnfollowing = req.body.userUnfollowing
    let userUnfollowde = req.body.userUnfollowed
})

module.exports = router