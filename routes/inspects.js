let express = require('express');
let router = express.Router();
let inspectLogic = require('../logic/inspect');

router.get('/getInspects', (req, res, next) => {

    let aId = req.query.aId || ''

    inspectLogic.findInspects(req, res, next, aId)
});

router.post('/addInspect', (req, res, next) => {

    console.log(req.body, req.body.iName, req.body.iWho, req.body.iLength, req.body.iWeight, req.body.other, req.body.time)

    let iName = req.body.iName || 'test';
    let iWho = req.body.iWho || 'test';
    let iLength = req.body.iLength || 0;
    let iWeight = req.body.iWeight || 0;
    let other = req.body.other || '无';
    let time = req.body.time || 0
    let aId = req.body.aId || ""

    inspectLogic.insertOneInspect(req, res, next, iName, iWho, iLength, iWeight, other, time, aId)
});

module.exports = router;
