import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  center: {
   textAlign: 'center'
  },
}));

export const DenyApplicationModal = () => {
  const classes = useStyles();
  const fullWidth = true;

  return (
    <>
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
    </>
  );
}
