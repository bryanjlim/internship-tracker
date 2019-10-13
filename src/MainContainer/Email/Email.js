import React, { Component } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { Typography, CardHeader, CardContent } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CheckIcon from "@material-ui/icons/Check";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import StepConnector from "@material-ui/core/StepConnector";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import EmailDialog from "./EmailDialog";

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
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
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
    alignItems: "center",
    cursor: "pointer"
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
    this.state = { emailContent: "", status: "", dialogOpen: false };
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
      <div>
        <EmailDialog
          onClose={() => this.setState({ dialogOpen: false })}
          dialogOpen={this.state.dialogOpen}
          emailContent={this.state.emailContent}
          status={this.state.status}
        />
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
                  <Step
                    key={label}
                    onClick={() =>
                      this.setState({
                        emailContent:
                          label.toUpperCase() === "APPLIED"
                            ? this.props.applied
                            : label.toUpperCase() === "ACCEPTED"
                            ? this.props.accepted
                            : label.toUpperCase() === "REJECTED"
                            ? this.props.rejected
                            : label.toUpperCase() === "INTERVIEWING"
                            ? this.props.interviewing
                            : "INVALID STATUS - ERROR",
                        status: label,
                        dialogOpen: true
                      })
                    }
                  >
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Email);
