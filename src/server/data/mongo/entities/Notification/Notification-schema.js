const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["frequest-sent, frequest-received, frequest-accepted"]
    },
    dateOfCreation: {
        type: Date
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = {notificationSchema};