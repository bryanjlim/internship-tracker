import React, { Component } from "react";
import classnames from "classnames";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  CardHeader,
  CardContent,
  Collapse
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import purple from "@material-ui/core/colors/purple";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CheckIcon from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import StepConnector from "@material-ui/core/StepConnector";
import _ from "lodash";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const styles = theme => ({
  card: {
    width: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: purple[500]
  }
});

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CheckIcon />,
    2: <GroupAddIcon />,
    3: <SentimentVerySatisfiedIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return ["Applied", "Interviewing", "Accepted"];
}

export class Email extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const activeStep =
      this.props.status === "Applied"
        ? 0
        : this.props.status === "Interviewing"
        ? 1
        : this.props.status === "Accepted"
        ? 2
        : 3;
    const { classes } = this.props;
    const steps = getSteps();
    return (
      <Card className={classes.card}>
        <CardHeader title={this.props.company}></CardHeader>
        <CardContent>
          {this.props.status === "Rejected" ? (
            <Typography variant="body1">Rejected</Typography>
          ) : (
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
        </CardContent>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: this.state.expanded
          })}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1">
            {this.props.status === "Applied"
              ? this.props.applied
              : this.props.status === "Accepted"
              ? this.props.accepted
              : this.props.status === "Rejected"
              ? this.props.rejected
              : this.status === "Interviewing"
              ? this.props.interviewing
              : "INVALID STATUS - ERROR"}
          </Typography>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(Email);
