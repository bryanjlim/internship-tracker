var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let userId = req.userId;
    let authToken = req.authToken;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("returning data"));
});

module.exports = router;
