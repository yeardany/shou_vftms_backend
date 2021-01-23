var express = require('express');
var router = express.Router();
var userLogic = require('../logic/user');

router.post('/register', (req, res, next) => {

    let uName = req.body.uName || '';
    let uPassword = req.body.uPassword || '';
    let uRole = req.body.uRole || '';
    let aId = req.body.aId || '';

    userLogic.insertOneUser(req, res, next, uName, uPassword, uRole, aId)
});

router.post('/login', (req, res, next) => {

    let uName = req.body.uName || '';
    let uPassword = req.body.uPassword || '';
    let aId = req.body.aId || '';

    userLogic.findUser(req, res, next, uName, uPassword, aId)
});

module.exports = router;
