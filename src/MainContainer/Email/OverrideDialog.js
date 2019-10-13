import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Select from "@material-ui/core/Select";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers"
import { TextField, MenuItem } from "@material-ui/core";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

const OverrideDialog = props => {
  console.log(props);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.dialogOpen}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Manual Override
        </DialogTitle>
        <DialogContent>
        <Grid container direction="column">
            <Grid item>
            <TextField label="Company" value={props.company} onChange={(e) => props.setCompany(e.target.value)}></TextField>
            </Grid>
            <Grid item>
            <Select label="Status" value={props.status} onChange={(e) => props.setStatus(e.target.value)}>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interviewing">Interviewing</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
            </Grid>
            <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={props.time}
                onChange={(e) => props.setTime(e.target.value)}/>
            </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {props.onClose(true)}} autoFocus>
            Save
          </Button>
          <Button onClick={() => {props.onClose(false)}} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OverrideDialog;
