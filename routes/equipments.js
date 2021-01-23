let express = require('express');
let router = express.Router();
let equipmentLogic = require('../logic/equipment');

router.get('/getEquipments', (req, res, next) => {

    let aId = req.query.aId || ''

    equipmentLogic.findEquipments(req, res, next, aId)
});

router.post('/getEquipmentById', (req, res, next) => {
    let pushID = req.body.pushID
    let id = req.body.id
    equipmentLogic.findEquipmentById(req, res, next, pushID, id)
});

router.post('/updateCoordinate', (req, res, next) => {
    let id = req.body.id,
        pLocation = req.body.pLocation,
        setObj = {"pLocation": [pLocation[0] * 1, pLocation[1] * 1]},
        pushObj = {}

    equipmentLogic.updateEquipmentDataById(req, res, next, id, setObj, pushObj)
})

module.exports = router;
