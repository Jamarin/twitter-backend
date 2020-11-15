const mongoose = require('mongoose')

// Define schema
const Schema = mongoose.Schema

const User = {
    email: '',
    image: '',
    password: '',
    role: '',
    username: ''
}

const userModelSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    email: String,
    image: String,
    password: String,
    role: String,
    username: String

})

const UserModel = mongoose.model('UserModel', userModelSchema, 'users')

module.exports = {
    UserModel,
    User
}