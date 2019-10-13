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
