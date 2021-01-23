/**
 * Created by evercx on 2017/3/1.
 */

let inspectModel = require('../models/inspect');


module.exports = {

    findInspects: function (req, res, next, obj) {

        return inspectModel.find(obj)

    },

    insertOneInspect: function (req, res, next, iName, iWho, iLength, iWeight, other, time, aId) {

        console.log(iName, iWho, iLength, iWeight, other, time, aId)

        let newInspect = new inspectModel({
            iName: iName,
            iWho: iWho,
            iLength: iLength,
            iWeight: iWeight,
            other: other,
            time: time,
            aId: aId
        });

        return newInspect.save()
    }
};
