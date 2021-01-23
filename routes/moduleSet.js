var express = require('express');
var router = express.Router();
var moduleLogic = require('../logic/module');

router.post('/getModuleSet', (req, res, next) => {

    let uRole = req.body.uRole || '';
    let aId = req.body.aId || '';

    moduleLogic.getModuleSet(req, res, next, uRole, aId)
});

module.exports = router;
