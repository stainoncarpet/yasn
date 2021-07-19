const mongoose = require('mongoose');

const {conversationSchema} = require("./Conversation-schema.js");

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = {Post};