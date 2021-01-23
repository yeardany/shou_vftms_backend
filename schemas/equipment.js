var mongoose = require('mongoose');
var equipmentSchema = new mongoose.Schema({
    eName: {
        type: String,
        required: true
    },
    oLocation: {
        type: Array,
        required: true
    },
    pLocation: {
        type: Array,
        required: true
    },
    dist: {
        type: Number,
        required: true
    },
    upLoadTime: {
        type: String,
        required: false
    },
    lHistory: {
        type: Array,
        required: true
    },
    aId: {
        type: String,
        required: true
    }
});

module.exports = equipmentSchema;
