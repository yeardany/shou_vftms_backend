/**
 * Created by evercx on 2017/3/1.
 */

var userModel = require('../models/user');

module.exports = {

    findUser: function (req, res, next, uName, uPassword, aId) {

        return userModel.find({uName: uName, uPassword: uPassword, aId: aId})
    },

    insertOneUser: function (req, res, next, uName, uPassword, uRole, aId) {

        let newInspect = new userModel({
            uName: uName,
            uPassword: uPassword,
            uRole: uRole,
            aId: aId
        });

        return newInspect.save()
    }
};
