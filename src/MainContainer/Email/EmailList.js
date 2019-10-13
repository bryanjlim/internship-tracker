import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Email from "./Email";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
});

function Emails(props) {
  const emails2019 = [
    {
      company: "Google",
      position: "Google Engineering Practicum Summer Intern",
      status: "Accepted",
      accepted:
        "Congratulations! Your application for the Google Engineering Practicum has been accepted!",
      interviewing: "Your are interviewing next week.",
      applied: "We have recieved your application.",
      time: "3/7/2019"
    },
    {
      company: "Amazon",
      position: "Software Engineering Intern",
      status: "Rejected",
      applied: "Your application for Summer 2020 has been received",
      rejected:
        "We regret to inform you that we are unable to offer you an internship for the summer of 2020",
      time: "8/1/2019"
    },
    {
      company: "Microsoft",
      position: "Product Management Intern",
      status: "Applied",
      applied: "Your application has been received",
      time: "8/3/2019"
    }
  ];
  const listItems = emails2019.map(email => (
    <Grid item key={email.company + " " + email.position}>
      <Email
        company={email.company}
        status={email.status}
        time={email.time}
        accepted={email.accepted}
        applied={email.applied}
        rejected={email.rejected}
        interviewing={email.interviewing}
      ></Email>
    </Grid>
  ));
  return listItems;
}

export class EmailList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.root}
        direction="column"
        spacing={5}
      >
        {Emails(this.props)}
      </Grid>
    );
  }
}

export default withStyles(styles)(EmailList);
