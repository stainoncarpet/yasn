const mongoose = require('mongoose');

const {passwordResetActionSchema} = require("./Password-reset-action-schema");

const PasswordResetAction = mongoose.model('PasswordResetAction', passwordResetActionSchema);

module.exports = {PasswordResetAction};