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
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    position: "sticky",
    bottom: "1em"
  }
});

function Emails(props) {
  let listItems = [];
  Object.keys(props.years).forEach(year => {
    Object.keys(props.years[year]).forEach(company => {
      listItems.push(
        <Grid item key={company}>
          <Email
            company={company}
            status={props.years[year][company].status}
            time={props.years[year][company].time}
            accepted={props.years[year][company].accepted}
            applied={props.years[year][company].applied}
            rejected={props.years[year][company].rejected}
            interviewing={props.years[year][company].interviewing}
          ></Email>
        </Grid>
      );
    });
  });
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
