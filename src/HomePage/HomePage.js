import React from "react";
import { Button, CssBaseline, Typography } from "@material-ui/core";

export const App = props => {
  return (
    <div>
      <CssBaseline />
      <Typography variant="h1">TMI</Typography>
      <Button onClick={props.signIn}>Sign In With Google</Button>
    </div>
  );
};

export default App;
