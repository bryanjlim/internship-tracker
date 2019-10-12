import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    const config = {
      // TODO: put Firebase config here
    };
    firebase.initializeApp(config);

    this.state = {
      isSignedIn: false,
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
      } else {
        console.log("ERR: No User")
      }
    });

    this.signIn = this.signIn.bind(this);
    this.googleAuthentication = this.googleAuthentication.bind(this);
  }

  render() {
    if (this.state.isLoading) {
      return (<div className="App"><div>This Is Our App</div></div>);
    }
  }

  signIn() {
    this.googleAuthentication().then(() => {
      this.setState({ isSignedIn: true });
    }).catch((e) => {
      console.log("error: " + e);
    });
  }

  googleAuthentication() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Promise((res, err) => {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        res();
      }).catch(function (error) {
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