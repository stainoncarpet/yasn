const mongoose = require('mongoose');

const friendshipSchema = mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    friendshipStatus: {
        type: String,
        enum: ["pending", "friends"],
        default: "pending"
    },
    dateOfFormation: Date
});

module.exports = {friendshipSchema};