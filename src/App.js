import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";

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
      measurementId: "G-5QG71NE3VY",
      clientId:
        "700705257439-rp5cs8jgvb28p3rqtlqhemererk5cb4p.apps.googleusercontent.com",
      scopes: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/gmail.readonly"
      ]
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.state = {
      isSignedIn: false
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({isSignedIn: true})
        const db = firebase.database();
        let years = [];
        let userData;
        db.ref("/" + user.uid)
          .once("value")
          .then(value => {
            const items = value.toJSON();
            if (items != null) {
              years = items[years];
              userData = items[userData];
            }
          });
      } else {
        console.log("ERR: No User");
      }
    });

    this.signIn = this.signIn.bind(this);
    this.googleAuthentication = this.googleAuthentication.bind(this);
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="App">
          <button onClick={this.signIn}>Sign In</button>
        </div>
      );
    } else {
      return <h1>Signed In!</h1>;
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
