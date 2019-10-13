import React from "react";
import { Typography, CssBaseline, withStyles } from "@material-ui/core";

const styles = {
  overallContainer: {
    textAlign: "center",
    width: "100%"
  },
  centerLogo: {
    width: "90%",
    maxWidth: 550,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    display: "block"
  },
  centerText: {
    fontSize: '2em',
    marginTop: 10,
    textAlign: "center"
  },
  signInButton: {
    width: 175,
    marginTop: "5em",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    display: "block",
    cursor: "pointer"
  }
};

const HomePage = props => {
  const { classes } = props;
  return (
    <div className={classes.overallContainer}>
      <CssBaseline />
      <img
        className={classes.centerLogo}
        alt="TMI Logo"
        src={require("../logo.png")}
      />

      <Typography className={classes.centerText} variant="h6">
        <i>Track My Internship</i>
      </Typography>

      <img
        className={classes.signInButton}
        alt="Sign In"
        src={require("../signInButton.png")}
        onClick={props.signIn}
      />
    </div>
  );
};

export default withStyles(styles)(HomePage);
