const mongoose = require('mongoose');

const passwordResetActionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
});

module.exports = {passwordResetActionSchema};