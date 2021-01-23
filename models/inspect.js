var mongoose = require('mongoose');
var inspectSchema = require('../schemas/inspect');

var inspectModel = mongoose.model('inspect', inspectSchema, 'inspects');

module.exports = inspectModel
