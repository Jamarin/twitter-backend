const mongoose = require("mongoose");
const {generateAccessToken} = require("../middlewares/jwt");
const UserModel = require('../models/user').UserModel

Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

const createUser = async (user) => {
    const userModel = new UserModel({
        email: user.user.email,
        image: user.user.image,
        password: user.user.password,
        role: 'user',
        username: user.user.username,
        following: [],
        follower: []
    })
    return {
        status: 200,
        user: await userModel.save()
    }
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

const follow = async (mainUser, followedUser) => {
    let user = await getUserById(mainUser)
    let followed = await getUserById(followedUser)

    let response = {
        status: 200,
        data: {
            message: 'Follow completed',
            following: []
        }
    }

    if(!user.following.includes(mongoose.Types.ObjectId(followedUser)))
        user.following.push(mongoose.Types.ObjectId(followedUser))
    else response = {status: 400, message: "Cannot follow user followed yet"}
    if(!followed.follower.includes(mongoose.Types.ObjectId(mainUser)))
        followed.follower.push(mongoose.Types.ObjectId(mainUser))
    else response = {status: 400, message: "Cannot follow user followed yet"}
    await user.save()
    await followed.save()
    response.data.following = await user.following
    return response
}

const unfollow = async (mainUser, unfollowedUser) => {
    let response = {
        status: 200,
        data: {
            message: 'Unfollow completed',
            following: []
        }
    }
    let user = await getUserById(mainUser)
    let unfollowed = await getUserById(unfollowedUser)
    if(user.following.includes(mongoose.Types.ObjectId(unfollowedUser)))
        user.following.remove(unfollowedUser)
    else response = {
        status: 400,
        message: 'Cannot unfollow user not followed yet'
    }
    if(unfollowed.follower.includes(mongoose.Types.ObjectId(mainUser)))
        unfollowed.follower.remove(mainUser)
    else response = {
        status: 400,
        message: 'Cannot unfollow user not followed yet'
    }
    await user.save()
    await unfollowed.save()
    response.data.following = await user.following
    return response
}

const getUsersFollowing = async (id) => {
    let user = await getUserById(id)
    return user.following
}

const getUsersFollower = async (id) => {
    let user = await getUserById(id)
    return user.follower
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
    login,
    getUsersFollower,
    getUsersFollowing,
    follow,
    unfollow
}