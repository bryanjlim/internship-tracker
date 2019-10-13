var express = require("express");
var fetch = require("node-fetch");
var base64 = require('js-base64').Base64; // used to decode email body
var router = express.Router();

router.get("/", function(req, res, next) {
//   console.log("get");
  let userId = req.query.userId;
  let accessToken = req.query.authToken;
  let mostRecentTime = req.query.mostRecentTime;
//   console.log(userId);
//   console.log(accessToken);
//   console.log(mostRecentTime);
//   let vals = { userId, accessToken, mostRecentTime };

  let url = "https://www.googleapis.com/gmail/v1/users/me/messages" + "?access_token=" + accessToken +
            "&maxResults=2&q=(+intern OR +interns OR +internship) AND after:" + mostRecentTime;
  console.log("url: " + url);
  fetch(url)
    .then(response => response.json())
    .then(json => {
      // map: key is time frame, value is array of application objects of that timeframe
      let applications = new Map();
      Object.keys(json.messages).forEach(function(k) {
        let id = json.messages[k].id;
        let getUrl = "https://www.googleapis.com/gmail/v1/users/me/messages/" + id + "?access_token=" + accessToken;
        console.log("newurl: " + getUrl);
        fetch(getUrl)
          .then(details => details.json())
          .then(data => {
              console.log("DATATATAT");
              console.log(data);
              //TODO convert mostrecent time to mostrecent cycle

              //
              
              // TODO get unencrypted header of email
              let header = null;
              // ~~~~~~~~~~~~~

              // unencrypt body of email
              let body = data.payload.parts[0].body.data;
              let uBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));
              console.log(uBody);

              // get company with nlp
              let company = null;
              console.log("step1");
              
              // get current status with nlp
              let status = "processing";
              console.log("step2");

              if(!applications.has(mostRecentTime)) { // no date key present, add empty list
                applications.set(mostRecentTime, new Map());
              }
              console.log("step3");
              let previousEmails = [];
              if(applications.get(mostRecentTime).get(company)) { // no company key present
                console.log("step4");
                previousEmails = applications.get(mostRecentTime).get(company).emails;
              }              
              console.log("step5");
              previousEmails.push({"header": header, "body": body});
              console.log("step6");
              applications.get(mostRecentTime).set(company, {"status": status, "emails": previousEmails});
              console.log("step7");
              console.log("cycles: " + applications.size)
              console.log("1st cycle companies: " + applications.size)
          });
      });

      res.setHeader("Content-Type", "application/json");
      let test = { json, userId, accessToken };
      res.send(JSON.stringify(applications));
    });
});

module.exports = router;
