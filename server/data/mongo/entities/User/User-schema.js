const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    userName: String,
    location: {
        country: String,
        state: String,
        city: String
    },
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
    friendships: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Friendship'
    }],
    lastOnline: Date,
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
    dislikedPosts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    likedComments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    dislikedComments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Notification'
    }],
    conversations: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Conversation'
    }],
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

module.exports = {userSchema};