const mongoose = require('mongoose');

const {userSchema} = require("./User-schema.js");

const User = mongoose.model('User', userSchema);

module.exports = {User};