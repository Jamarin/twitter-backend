const mongoose = require('mongoose')

// Define schema
const Schema = mongoose.Schema

const UserModel = mongoose.model('UserModel')

const tweetModelSchema = new Schema({
    author: { type: Schema.ObjectId, ref: UserModel },
    created_at: { type: Date, default: Date.now },
    text: String
})

const TweetModel = mongoose.model('TweetModel', tweetModelSchema, 'tweets')

module.exports = {
    TweetModel
}