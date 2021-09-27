const mongoose = require('mongoose');

const {commentSchema} = require("./Comment-schema.js");

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Comment};