/**
 * Created by evercx on 2017/3/1.
 */

var equipmentModel = require('../models/equipment');
var JPush = require("jpush-async/lib/JPush/JPushAsync")
var client = JPush.buildClient('aee5dd8a5c188f15563ba563', '91f355686bc15e5d248ca560')

module.exports = {

    findEquipments: (req, res, next, obj) => {

        return equipmentModel.find(obj)

    },

    findEquipmentById: (req, res, next, pushID, id) => {

        return equipmentModel.findById(id)

    },

    updateEquipmentCoordinateById: (req, res, next, setObj, pushObj, id) => {

        return equipmentModel.findByIdAndUpdate(id, {$set: setObj, $push: pushObj}, {'new': true})

    },

    insertManyEquipment: (req, res, next, setData) => {

        return equipmentModel.create(setData)

    },

    deleteEquipmentByName: (req, res, next, eqNameArray) => {

        return equipmentModel.deleteMany({eName: {$in: eqNameArray}})

    },

    pushToOne: function (pushID) {

        return client.push().setPlatform('android')
            .setAudience(JPush.registration_id(pushID))
            .setNotification(JPush.android('浮标漂移超出限定范围！', '警报！', null, null, 2, null, 1))
            .send()

    },

    pushToAll: function () {

        return client.push().setPlatform('android')
            .setAudience(JPush.ALL)
            .setNotification(JPush.android('浮标漂移超出限定范围！', '警报', null, null, 2, null, 1))
            .send()

    }
};
