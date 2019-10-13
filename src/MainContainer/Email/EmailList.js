import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Email from "./Email";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140
  },
  control: {
    padding: theme.spacing(2)
  }
});

function Emails(props) {
  const emails2019 = [
    {
      company: "Google",
      status: "Accepted",
      accepted:
        "Congratulations! Your application for the Google Engineering Practicum has been accepted!",
      interviewing: "You are interviewing next week.",
      applied: "We have received your application.",
      time: "3/7/2019"
    },
    {
      company: "Amazon",
      status: "Rejected",
      applied: "Your application for Summer 2020 has been received",
      rejected:
        "We regret to inform you that we are unable to offer you an internship for the summer of 2020",
      time: "8/1/2019"
    },
    {
      company: "Microsoft",
      status: "Applied",
      applied: "Your application has been recieved",
      time: "8/3/2019"
    }
  ];
  emails2019.sort((a, b) => {
    return (new Date(a.time).getTime() > new Date(b.time).getTime()) ? -1 : 1;
  });
  const listItems = emails2019.map(email => (
    <Grid item key={email.company}>
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
