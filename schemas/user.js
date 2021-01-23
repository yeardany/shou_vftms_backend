var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    uName: {
        type: String,
        required: true
    },
    uPassword: {
        type: String,
        required: true
    },
    uRole: {
        type: String,
        required: true
    },
    aId: {
        type: String,
        required: true
    }
});

module.exports = userSchema;
