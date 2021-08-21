const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    messages: [{
        speaker: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        dateOfTyping: Date
    }]
});

module.exports = {conversationSchema};

