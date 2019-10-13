var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let userId = req.query.userId;
    let authToken = req.query.authToken;
    let mostRecentTime = new Date(req.query.mostRecentTime);
    let vals = {userId, authToken, mostRecentTime};
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(vals));
});

module.exports = router;
