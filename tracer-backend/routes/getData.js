var express = require("express");
var fetch = require("node-fetch");
var base64 = require('js-base64').Base64; // used to decode email body
var router = express.Router();

router.get("/", function(req, res, next) {
//   console.log("get");
  let userId = req.query.userId;
  let accessToken = req.query.authToken;
  let mostRecentTime = "10/08/2019"; //req.query.mostRecentTime;
//   console.log(userId);
//   console.log(accessToken);
  console.log(mostRecentTime);
//   let vals = { userId, accessToken, mostRecentTime };

  let url = "https://www.googleapis.com/gmail/v1/users/me/messages" + "?access_token=" + accessToken +
            "&maxResults=10&q=(+intern OR +interns OR +internship) AND after:" + mostRecentTime;
  console.log("url: " + url);
  // map: key is time frame, value is array of application objects of that timeframe
  let applications = {};
  fetch(url).then(response => response.json()).then(async function(json) {
      if(!json.messages) { // no intern emails
          console.log("\nnothing found")
          res.send(JSON.stringify(applications));
      } else {
          console.log("foreach loop");
          let counter = 0;
          for(const messages of json.messages) {
            let id = json.messages[counter].id;
            counter++;
            console.log("countervalue:" + counter);
            let getUrl = "https://www.googleapis.com/gmail/v1/users/me/messages/" + id + "?access_token=" + accessToken;
            console.log("newurl: " + getUrl);
            await fetch(getUrl).then(details => details.json()).then(async (data) => {
                console.log("DATATATAT");
                console.log(data);
                //TODO convert mostrecent time to mostrecent cycle
                let time = null;
                //
                
                // TODO get unencrypted header of email
                let header = null;
                // ~~~~~~~~~~~~~

                // unencrypt body of email
                let body = data.payload.parts[0].body.data;
                let uBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));
                console.log(uBody);

                await parseEmail(uBody).then(results => {
                // get company with nlp
                    console.log("after parsing");
                    if(results[0] && results[1]) {
                        let company = results[0];
                        console.log("step1");
                        console.log(company);

                        // get current status with nlp
                        let status = results[1];
                        console.log("step2");
                        console.log(status);

                        if(applications[mostRecentTime] == null) { // no date key present, add empty list
                            console.log("increase size");
                            applications[mostRecentTime] = {};
                        }
                        console.log("step3");
                        let previousEmails = [];
                        if(applications[mostRecentTime][company] != null) { // no company key present
                            console.log("step4");
                            previousEmails = applications[mostRecentTime][company]["emails"];
                        }
                        console.log("step5");
                        previousEmails.push({"header": header, "body": uBody, "status": status, "time": time});
                        console.log("step6");
                        applications[mostRecentTime][company] = {"status": status, "emails": previousEmails};
                        console.log("step7");
                        }
                    });
                });
            }
            console.log("step8");
            res.setHeader("Content-Type", "application/json");
            console.log(JSON.stringify(applications));
            res.send(JSON.stringify(applications));
        }
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


    return new Promise((res,err) => {
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
        console.log("FINISHED PARSING: " + parseProduct);
        res(parseProduct);
    })
    
}

// parseEmail("You can view, comment on, or merge this pull request online at:" + 
// "https://github.com/bryanjlim/internship-tracker/pull/12" +
// "Commit Summary" + 
// "Added date UI to emails" + 
// "File Changes" + 
// "M src/MainContainer/Email/Email.js (5)" + 
// "Patch Links:");

module.exports = router;
