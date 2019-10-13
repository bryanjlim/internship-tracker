import React, { Component } from "react";
import firebase from "firebase";
import HomePage from "./HomePage/HomePage";
import MainContainer from "./MainContainer/MainContainer";
import Header from "./Header/Header";
import { CssBaseline } from "@material-ui/core";

const mockData = {
  2019: {
    Google: {
      status: "Accepted",
      accepted:
        "Congratulations! Your application for the Google Engineering Practicum has been accepted!",
      interviewing: "You are interviewing next week.",
      applied: "We have received your application.",
      time: "9/7/2019"
    },
    Amazon: {
      status: "Rejected",
      applied: "Your application for Summer 2020 has been received",
      rejected:
        "We regret to inform you that we are unable to offer you an internship for the summer of 2020",
      time: "10/1/2019"
    },
    Microsoft: {
      status: "Applied",
      applied: "Your application has been recieved",
      time: "9/3/2019"
    }
  }
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      isInitializing: true,
      years: mockData
    };

    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
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
  }

  fetchData(mostRecentTime, authToken) {
    var url = new URL("http://localhost:9000/getData");
    let userId = firebase.auth().currentUser.uid;
    let params = {
      authToken,
      userId,
      mostRecentTime
    };
    url.search = new URLSearchParams(params);
    fetch(url)
      .then(function(response) {
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
          <Header />
          <MainContainer years={this.state.years} />
        </div>
      );
    } else {
      return <HomePage signIn={this.signIn} />;
    }
  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/gmail.readonly");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // Populate data and send auth to server
        let authToken = result.credential.accessToken;
        let user = result.user;
        const db = firebase.database();
        db.ref("/" + user.uid)
          .once("value")
          .then(value => {
            let userData = {
              mostRecentTime: "04/01/2004"
            };
            let years = [];
            const items = value.toJSON();
            if (items != null) {
              if (items["years"] != null) {
                years = items["years"];
              }
              if (items["userData"] != null) {
                userData = items["userData"];
              }
            }
            this.fetchData(userData.mostRecentTime, authToken);
            this.setState({ isSignedIn: true, years });
          });
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
