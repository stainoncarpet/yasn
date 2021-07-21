const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    userName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    dateOfBirth: Date,
    dateOfRegistration: Date,
    avatar: String,
    authTokens: [String],
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    likedComments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    dislikedPosts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    dislikedComments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

module.exports = {userSchema};