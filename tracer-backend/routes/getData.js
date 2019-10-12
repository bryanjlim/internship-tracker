var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let userId = req.userId;
    let authToken = req.authToken;
    res.render('index', { title: 'analyzing sentiment' });
});

module.exports = router;
