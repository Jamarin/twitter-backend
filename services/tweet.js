const mongoose = require("mongoose");

const TweetModel = require('../models/tweet').TweetModel

const createTweet = async (tweet) => {
    const tweetModel = new TweetModel({
        text: tweet.tweet.text,
        author: tweet.tweet.author
    })
    return await tweetModel.save()
}

const getAllTweets = async () => {
    return TweetModel.find()
}

const getTweetsByAuthor = async (author) => {
    return TweetModel.find({author: mongoose.Types.ObjectId(author)})
}

module.exports = {
    createTweet,
    getAllTweets,
    getTweetsByAuthor
}