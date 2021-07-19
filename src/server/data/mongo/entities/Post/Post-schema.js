const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    dateOfPublication: Date,
    title: String,
    content: String,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    likers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    dislikers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    reposters: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
});

module.exports = {postSchema};