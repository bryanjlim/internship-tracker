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

async function parseEmail(text) {
    const CONFIDENCE_VALUE = 0.3;
    const acceptStrings = ["accept", "congratulat"];
    const denyStrings = ["denied", "regret", "unable to offer", "not selected",
        "thank you for your time", "encourage you to apply for other", "filled the position",
        "selected a candidate", "decided not to proceed", "best of luck"];

    let parseProduct = []; // Return value. Formatted as [companyName, applicationStatus]
    const language = require('@google-cloud/language');
    const client = new language.LanguageServiceClient();
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };
    // Fetches a list of all entities (basically proper nouns)
    const [entityData] = await client.analyzeEntities({document: document});
    const entities = entityData.entities;
    // Feels the vibe the text gives off I guess
    let [sentiment] = await client.analyzeSentiment({document: document});
    let score = sentiment.score;

    let mostSalient = 0;
    let mostSalientValue;
    let status;

    // For each entity, if we haven't guessed the email content, check for indicators of each email value
    entities.forEach(entity => {
        if(entity.type == "ORGANIZATION") {
            if(entity.salience > mostSalient) {
                mostSalient = entity.salience;
                mostSalientValue = entity.name;
            }

            if(status !== 'undefined') {
                let lowerText = text.toLowerCase();
                acceptStrings.forEach(string => {
                    if(status !== 'undefined' && lowerText.includes(string)) {
                        status = "accepted";
                    }
                });
                denyStrings.forEach(string => {
                    if(status !== 'undefined' && lowerText.includes(string)) {
                        status = "denied";
                    }
                });
                if (status !== 'undefined' && lowerText.includes("interview")) {
                    status = "interviewing"
                }
                if(status !== 'undefined' && Math.abs(score) > CONFIDENCE_VALUE) {
                    status = score > 0 ? "accepted" : "denied";
                }
            }
        }
    });
    parseProduct.push(mostSalientValue, status);
    return parseProduct;
}

module.exports = router;
