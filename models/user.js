const mongoose = require('mongoose')

// Define schema
const Schema = mongoose.Schema

const User = {
    email: '',
    image: '',
    password: '',
    role: '',
    username: '',
    following: [],
    follower: []
}

const userModelSchema = new Schema({
    created_at: {type: Date, default: Date.now},
    email: String,
    image: String,
    password: String,
    role: String,
    username: String,
    following: [{ type: Schema.ObjectId, ref: this }],
    follower: [{ type: Schema.ObjectId, ref: this }]

})

const UserModel = mongoose.model('UserModel', userModelSchema, 'users')

module.exports = {
    UserModel,
    User
}