var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/farm', function (req, res, next) {
    res.render('farm');
});

router.get('/manage', function (req, res, next) {
    res.render('manage');
});

module.exports = router;
