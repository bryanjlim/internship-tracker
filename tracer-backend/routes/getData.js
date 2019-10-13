var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let userId = req.query.userId;
    let authToken = req.query.authToken;
    let time = req.query.mostRecentTime;
    let test = "hi";
    let vals = {userId, authToken, time, test};
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(vals));
});

module.exports = router;
