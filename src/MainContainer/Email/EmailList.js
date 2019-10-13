import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Email from "./Email";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import OverrideDialog from "./OverrideDialog";
import firebase from "firebase";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140
  },
  control: {
    padding: theme.spacing(2)
  },
  fab: {
    margin: theme.spacing(1),
    float: "right",
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
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
    return new Date(a.time).getTime() > new Date(b.time).getTime() ? -1 : 1;
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
  constructor(props) {
    super(props);
    this.state = {
      emailContent: "",
      status: this.props.status,
      company: this.props.company,
      time: this.props.time,
      overrideOpen: false
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
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
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={() => {
            this.setState({
              overrideOpen: true
            });
          }}
        >
          <AddIcon />
        </Fab>
        <OverrideDialog
          dialogOpen={this.state.overrideOpen}
          company={this.state.company}
          status={this.state.status}
          time={this.state.time}
          onClose={save => this.setState({ overrideOpen: false })}
          setCompany={company => this.setState({ company })}
          setStatus={status => this.setState({ status })}
          setTime={time => this.setState({ time })}
          onSubmit={() => {
            this.props.years["2019"].push({
              company: {
                status: this.state.status,
                time: this.state.time
              }
            });
            firebase
              .database()
              .ref("/" + firebase.auth().currentUser.uid)
              .set({ years: this.props.years });
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EmailList);
