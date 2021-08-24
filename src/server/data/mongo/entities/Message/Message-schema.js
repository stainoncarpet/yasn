const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Conversation',
        required: true
    },
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
});

module.exports = {messageSchema};