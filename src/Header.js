import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20
  },
  title: {
    flexGrow: 1
  }
});

export class Header extends Component {
  render() {
    return (
      <div className={this.props.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={this.props.menuButton}
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={this.props.title}>
              News
            </Typography>
            <Button color="inherit" onClick={this.props.signIn}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
