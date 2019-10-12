import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";
import MainContainer from "./MainContainer";
import Header from "./Header";

let gapi;

export class App extends Component {
  constructor(props) {
    super(props);

    const config = {
      apiKey: "AIzaSyDoj6K6NL3JzKbUv-K424ybISws9d16UhY",
      authDomain: "track-my-internship.firebaseapp.com",
      databaseURL: "https://track-my-internship.firebaseio.com",
      projectId: "track-my-internship",
      storageBucket: "track-my-internship.appspot.com",
      messagingSenderId: "700705257439",
      appId: "1:700705257439:web:7bceaee157b0e60d80366a",
      measurementId: "G-5QG71NE3VY"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.state = {
      isSignedIn: false
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://apis.google.com/js/api.js";
        // Once the Google API Client is loaded, you can run your code
        script.onload = function(e) {
          // Initialize the Google API Client with the config object
          gapi.client
            .init({
              apiKey: config.apiKey,
              clientId: config.clientID,
              discoveryDocs: config.discoveryDocs,
              scope: config.scopes.join(" ")
            })
            // Loading is finished, so start the app
            .then(function() {
              // Make sure the Google API Client is properly signed in
              if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                console.log(user);
              } else {
                firebase.auth().signOut(); // Something went wrong, sign out
              }
            });
        };
      } else {
        console.log("ERR: No User");
      }
    });

    this.signIn = this.signIn.bind(this);
    this.googleAuthentication = this.googleAuthentication.bind(this);
  }

  render() {
    return(
      <div class="App">
        <Header signIn={this.signIn} isSignedIn={this.state.isSignedIn}></Header>
        <MainContainer isSignedIn={this.state.isSignedIn}></MainContainer>

      </div>
    );

    if(!this.state.isSignedIn) {
      return (
        <div className="App">
          <button onClick={this.signIn}>Sign In</button>
        </div>
      );
    } else {
      return (
        <h1>Signed In!</h1>
      )
    }
    
  }

  signIn() {
    this.googleAuthentication()
      .then(() => {
        this.setState({ isSignedIn: true });
      })
      .catch(e => {
        console.log("error: " + e);
      });
  }

  googleAuthentication() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise((res, err) => {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          res();
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          err(errorCode + errorMessage + email + credential);
        });
    });
  }
}

export default App;
