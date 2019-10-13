import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { CardHeader, CardContent } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ColorlibConnector from "./ColorLibConnector";
import ColorlibStepIcon from "./ColorLibStepIcon";
import EmailDialog from "./EmailDialog";
import ColorlibStepIconRejected from "./ColorLibStepIconRejected";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    width: "250dp",
    minwidth: "80%"
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
        : this.props.status === "Accepted" || this.props.status === "Rejected"
        ? 2
        : 3;
    const { classes } = this.props;
    const finalStep = this.props.status === "Rejected" ? "Rejected" : "Accepted"
    const steps = ["Applied", "Interviewing", finalStep];
    const mostRecent= "Most recent email received: " + this.props.time;
    return (
      <div>
        <EmailDialog
          onClose={() => this.setState({ dialogOpen: false })}
          dialogOpen={this.state.dialogOpen}
          emailContent={this.state.emailContent}
          status={this.state.status}
        />
        <Card  className={classes.card}>
          <CardHeader title={this.props.company} action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
            }
            subheader={mostRecent}
        >
          </CardHeader>
          <CardContent>
            {this.props.status === "Rejected" ? (
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
                  <StepLabel StepIconComponent={ColorlibStepIconRejected}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
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
