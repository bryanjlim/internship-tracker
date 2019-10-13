var express = require('express');
var router = express.Router();
const CONFIDENCE_VALUE = 0.3;

router.get('/', function(req, res, next) {
    let userId = req.userId;
    let authToken = req.authToken;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify("returning data"));
});

async function parseEmail(text) {
    let parseProduct = []; // [companyName, accept/reject]
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
    // For each entity, if we haven't found content, check for indicators of each email value
    entities.forEach(entity => {
        if(entity.type == "ORGANIZATION" && parseProduct.length == 0) {
            let lowerText = text.toLowerCase();
            if(lowerText.includes("accept") || lowerText.includes("contratulat")) {
                parseProduct.push(entity, "accepted");
            } else if (lowerText.includes("denied") || lowerText.includes("regret")
                    || lowerText.includes("unable to offer") || lowerText.includes("not selected")
                    || lowerText.includes("thank you for your time") || lowerText.includes("encourage you to apply for other openings")
                    || lowerText.includes("filled the position") || lowerText.includes("selected a candidate")) {
                parseProduct.push(entity, "denied");
            } else if (lowerText.includes("interview")) {
                parseProduct.push(entity, "interviewing");
            } else {
                if(Math.abs(score) > CONFIDENCE_VALUE) {
                    parseProduct.push(entity, score > 0 ? "accepted" : "denied");
                }
            }
        }
    });
    return parseProduct;
}

module.exports = router;
