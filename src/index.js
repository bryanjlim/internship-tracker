import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";

import App from "./App";

// Global Theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: purple
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
