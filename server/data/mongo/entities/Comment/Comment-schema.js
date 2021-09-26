const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    dateOfPublication: Date,
    content: String,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
        required: true
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment',
        default: null
    },
    likers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    dislikers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

module.exports = {commentSchema};