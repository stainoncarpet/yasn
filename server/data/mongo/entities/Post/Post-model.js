const mongoose = require('mongoose');

const {postSchema} = require("./Post-schema.js");

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};