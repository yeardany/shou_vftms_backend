var mongoose = require('mongoose');
var inspectSchema = new mongoose.Schema({
    iName: {
        type: String,
        required: true
    },
    iWho: {
        type: String,
        required: true
    },
    iLength: {
        type: Number,
        required: true
    },
    iWeight: {
        type: Number,
        required: true
    },
    other: {
        type: String
    },
    time: {
        type: Number,
        required: true
    },
    aId: {
        type: String,
        required: true
    }
});

module.exports = inspectSchema;
