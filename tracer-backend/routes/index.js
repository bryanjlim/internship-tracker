var express = require('express');
var router = express.Router();
// variables for Google API
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

// Change token directory to your system preference
var TOKEN_DIR = ('./');
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs.json';
 
var gmail = google.gmail('v1');

//const TOKEN_PATH = 'token.json';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// Load client secrets from a local file.
// Load client secrets from a local file. 
// fs.readFile('routes/credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Gmail API.
//   // CALL FUNCTIONS FROM HERE :) :) :)

//   //authorize(JSON.parse(content), getRecentEmail);
//   authorize(JSON.parse(content), getEmailBy);

// });


// send header of my request as authorization token
  //  request header and body
    // set request.header 

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}

/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getRecentEmail(auth) {
  // Only get the recent email - 'maxResults' parameter
  gmail.users.messages.list({auth: auth, userId: 'me', maxResults: 10,}, function(err, response) {
      if (err) {
          console.log('The API returned an error: ' + err);
          return;
      }

    // Get the message id which we will need to retreive tha actual message next.
    var message_id = response['data']['messages'][0]['id'];

    // Retreive the actual message using the message id
    gmail.users.messages.get({auth: auth, userId: 'me', 'id': message_id}, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }

       console.log(response['data']);
    });
  });
}

/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
*/


function getEmailBy(auth) {

  // get to know total number of emails

  gmail.users.messages.list({auth: auth, userId: 'me', q: "+intern OR +interns OR +internship", maxResults: 50,}, function(err, response) {
    if (err) {
        console.log('The API returned an error: ' + err);
        return;
    }

  // how to get length of lists of messages

    for (var i = 0; i < 1; i ++){
      var message_id = response['data']['messages'][i]['id'];

      // Retreive the actual message using the message id
      gmail.users.messages.get({auth: auth, userId: 'me', 'id': message_id}, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        console.log(response['data']);
      });
    }
  });
}