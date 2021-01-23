var mongoose = require('mongoose');
var userSchema = require('../schemas/user');

var userModel = mongoose.model('user', userSchema, 'users');

module.exports = userModel
