const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            "frequest-sent", "frequest-received", "frequest-accepted", "fship-canceled",
            "post-commented", 
            "pmessage-received"
        ]
    },
    dateOfCreation: {
        type: Date
    },
    isRead: Boolean,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    linkedEntity: {
        entityType: {
            type: String,
            enum: ["Friendship"]
        },
        entityId: {
            type: mongoose.Schema.Types.ObjectId
        },
        required: false
    }
});

module.exports = { notificationSchema };