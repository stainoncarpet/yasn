const mongoose = require('mongoose');

const {notificationSchema} = require("./Notification-schema.js");

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = {Notification};