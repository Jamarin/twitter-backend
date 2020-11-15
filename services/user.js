const mongoose = require("mongoose");
const {generateAccessToken} = require("../middlewares/jwt");
const UserModel = require('../models/user').UserModel

const createUser = async (user) => {
    console.log(user)
    const userModel = new UserModel({
        email: user.user.email,
        image: user.user.image,
        password: user.user.password,
        role: 'user',
        username: user.user.username
    })
    return await userModel.save()
}

const getUserByUsername = async (username) => {
    return UserModel.findOne({'username': username});
}

const getUserById = async (id) => {
    return UserModel.findOne({'_id': mongoose.Types.ObjectId(id)})
}

const getUserByEmail = async (email) => {
    return UserModel.findOne({'email': email});
}

const login = async (user) => {
    let theUser = await getUserByEmail(user.email)
    if (theUser.password === user.password) {
        let loggedUser = {
            username: theUser.username,
            email: theUser.email,
            role: theUser.role,
            id: theUser._id,
        }
        return {
            status: 200,
            data: {
                ...loggedUser,
                token: generateAccessToken(loggedUser)
            }
        }
    } else {
        return {
            status: 401,
            data: {}
        }
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById,
    login
}