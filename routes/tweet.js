const express = require('express')
let router = express.Router()
const tweetService = require('../services/tweet')
const userService = require('../services/user')

router.post('/create', async (req, res) => {
    let response = await tweetService.createTweet(req.body)
    res.json(response)
})

router.get('/all', async (req, res) => {
    let response = await tweetService.getAllTweets()
    let tweets = []
    for (let i = 0; i<response.length; i++) {
        tweets.push({
            text: response[i].text,
            created_at: response[i].created_at,
            author: await userService.getUserById(response[i].author)
        })
    }
    res.status(200).json(tweets)
})

router.get('/:author', async (req, res) => {
    let authorUsername = req.params.author
    let author = await userService.getUserByUsername(authorUsername)
    let response = await tweetService.getTweetsByAuthor(author._id)
    let tweets = []
    for(let i = 0; i<response.length; i++) {
        tweets.push({
            text: response[i].text,
            created_at: response[i].created_at,
            author: author
        })
    }
    res.status(200).json(tweets)
})

module.exports = router