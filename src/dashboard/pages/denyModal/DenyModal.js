import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  center: {
   textAlign: 'center'
  },
}));

export const DenyApplicationModal = ({show, closeModal}) => {
  const classes = useStyles();
  const fullWidth = true;

  return (
    <>
      <Dialog open={show} onClose={closeModal}>
        <DialogTitle>Deny Application?</DialogTitle>
        <DialogContent>
          <div className={classes.center}>
            Are you sure you want to DENY APPLICATION? <br /><br />
            <div>
              <TextField
                label="Remarks"
                placeholder="State reason"
                multiline
                variant="outlined"
                rows="10"
                fullWidth={fullWidth}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={closeModal}>YES, DENY</Button>
          <Button variant="contained" onClick={closeModal}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
