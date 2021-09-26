const mongoose = require('mongoose');

const {friendshipSchema} = require("./Friendship-schema.js");

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = {Friendship};