const mongoose = require('mongoose');

const {messageSchema} = require("./Message-schema.js");

const Message = mongoose.model('Message', messageSchema);

module.exports = {Message};