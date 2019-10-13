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
  let listItems = [];
  Object.keys(props.years).forEach(year => {
    Object.keys(props.years[year]).forEach(company => {
      listItems.push(
        <Grid item key={company}>
          <Email
            company={company}
            status={props.years[year][company].status}
            time={props.years[year][company].time}
            accepted={props.years[year][company].emails[0]['body']}
            applied={props.years[year][company].emails[0]['body']}
            rejected={props.years[year][company].emails[2]}
            interviewing={props.years[year][company].emails[1]}
          ></Email>
        </Grid>
      );
    });
  });
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
