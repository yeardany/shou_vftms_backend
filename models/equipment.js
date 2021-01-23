var mongoose = require('mongoose');
var equipmentSchema = require('../schemas/equipment');

var equipmentModel = mongoose.model('equip', equipmentSchema, 'equipments');

module.exports = equipmentModel
