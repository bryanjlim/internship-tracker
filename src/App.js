import React, { Component } from "react";
import firebase from "firebase";
import HomePage from "./HomePage/HomePage";
import MainContainer from "./MainContainer/MainContainer";
import Header from "./Header/Header";
import { CssBaseline } from "@material-ui/core";

export class App extends Component {
  constructor(props) {
    super(props);

    const firebaseConfig = {
      apiKey: "AIzaSyD6jrZUJhMJamgvhO1-FkKQA9rh-nbyr2o",
      authDomain: "track-internship.firebaseapp.com",
      databaseURL: "https://track-internship.firebaseio.com",
      projectId: "track-internship",
      storageBucket: "track-internship.appspot.com",
      messagingSenderId: "766437384638",
      appId: "1:766437384638:web:7287037185806f5bd699ef"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.state = {
      isSignedIn: false,
      isInitializing: true
    };

    this.signIn = this.signIn.bind(this);
    this.googleAuthentication = this.googleAuthentication.bind(this);
  }

  fetchData(mostRecentTime, authToken) {
    console.log("fetching data");
    var url = new URL("http://localhost:9000/getData");
    let userId = firebase.auth().currentUser.uid;
    let params = {
      authToken,
      userId,
      mostRecentTime
    };
    url.search = new URLSearchParams(params);
    fetch(url).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        console.log("returned something");
      });
  }

  render() {
    if (this.state.isSignedIn) {
      return (
        <div className="App">
          <CssBaseline />
          <Header
            signIn={this.signIn}
            isSignedIn={this.state.isSignedIn}
          ></Header>
          <MainContainer isSignedIn={this.state.isSignedIn}></MainContainer>
        </div>
      );
    } else {
      return <HomePage signIn={this.signIn} />;
    }
  }

  signIn() {
    this.googleAuthentication();
    }

  googleAuthentication() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/gmail.readonly");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log("success");
          let authToken = result.credential.accessToken;
          let user = result.user;
          const db = firebase.database();
          let years = [];
          let userData = {
            mostRecentTime: "04/01/2004"
          };
          db.ref("/" + user.uid)
            .once("value")
            .then(value => {
              const items = value.toJSON();
              if (items != null) {
                years = items[years];
                userData = items[userData];
            }
          });
          console.log("authtoken: " + authToken);
          this.fetchData(userData.mostRecentTime, authToken);
          this.setState({ isSignedIn: true });
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
        });
  }
}

export default App;
