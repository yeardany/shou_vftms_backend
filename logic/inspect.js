var inspectController = require('../controllers/inspect_controller');

let logic = {

    findInspects: (req, res, next, aId) => {

        let obj = {}

        if (aId === '')
            res.send([]).end();
        else
            obj = {aId: aId}

        inspectController.findInspects(req, res, next, obj).then((r) => {
            res.send(r).end()
        }).catch((error) => {
            console.log(error.message)
            res.send(error.message).end();
        });
    },

    insertOneInspect: (req, res, next, iName, iWho, iLength, iWeight, other, time, aId) => {

        inspectController.insertOneInspect(req, res, next, iName, iWho, iLength, iWeight, other, time, aId).then((r) => {
            console.log(r);
            res.send(r).end();
        }).catch((error) => {
            console.log(error.message)
            res.send(error.message).end()
        });
    }
}

module.exports = logic
