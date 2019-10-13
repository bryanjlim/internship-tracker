import React, {Component} from 'react';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CardHeader, CardContent, Collapse } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: purple[500],
    },
  });

export class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;
        return (
        <Card className={classes.card}>
            <CardHeader title={this.props.company}>   
            </CardHeader>
            <CardContent>
                <Typography variant="body2">
                    {this.props.status}
                </Typography>
            </CardContent>
            <IconButton className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <Typography variant="body1">Collapsed text</Typography>
            </Collapse>

        </Card>
        )
    }
}

export default withStyles(styles)(Email);