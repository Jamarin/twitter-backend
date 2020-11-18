const express = require('express')
let router = express.Router()
const userService = require('../services/user')

router.get('/verify', (req, res) => {
    res.status(200).send('token verified')
})

router.get('/username/:username', async (req, res) => {
    let username = req.params.username
    let response = await userService.getUserByUsername(username)
    res.send(JSON.stringify(response))
})

router.get('/email/:email', async (req, res) => {
    let email = req.params.email
    let response = await userService.getUserByUsername(email)
    res.send(JSON.stringify(response))
})

router.put('/follow/', async (req, res) => {
    let userFollowing = req.body.userFollowing
    let userFollowed = req.body.userFollowed
    let response = await userService.follow(userFollowing, userFollowed)
    res.status(response.status).send(response.data)

})

router.put('/unfollow/', async (req, res) => {
    let userUnfollowing = req.body.userUnfollowing
    let userUnfollowed = req.body.userUnfollowed
    let response = await userService.unfollow(userUnfollowing, userUnfollowed)
    res.status(response.status).send(response.data)
    res.status(response.status).send(response.data)
})

module.exports = router