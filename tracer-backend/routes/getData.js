var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("get");
    let userId = req.query.userId;
    let accessToken = req.query.authToken;
    let mostRecentTime = new Date(req.query.mostRecentTime);
    console.log(userId);
    console.log(accessToken);
    console.log(mostRecentTime);
    let vals = {userId, accessToken, mostRecentTime};

    let url = "https://www.googleapis.com/gmail/v1/users/me/messages?access_token=" + accessToken;
    // let params = { accessToken };
    // url.search = new URLSearchParams(params);
    console.log("url: " + url);
    fetch(url)
        .then(response => response.json())
        .then((json) => {
            res.setHeader('Content-Type', 'application/json');
            let test = {json, userId, accessToken}
            res.send(JSON.stringify(test));
    });
});




module.exports = router;
