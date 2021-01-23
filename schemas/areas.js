var mongoose = require('mongoose');
var areaSchema = new mongoose.Schema({
    aName: {
        type: String,
        required: true,
    },
    aId: {
        type: String,
        required: true
    }
});

module.exports = areaSchema;
