import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, InputLabel } from '@material-ui/core';
import { Colors } from '../../../common/constants/Colors';

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  dialog: {
    width: 465,
    fontSize: 16
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    height: 76,
    borderBottom: `1px solid ${Colors.BorderGray}`
  },
  prompt: {
    textAlign: 'center',
    marginTop: 36,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 26,

    fontWeight: 500
  },
  remarksLabel: {
    marginBottom: 12,
    color: Colors.BodyTextBlack
  }
}));

export const DenyApplicationModal = ({ show, closeModal }) => {
  const classes = useStyles();
  const fullWidth = true;

  return (
    <Dialog open={show} onClose={closeModal} fullWidth={true}
      maxWidth={'xs'}>
      <DialogTitle className={classes.title}>Deny Application?</DialogTitle>
      <DialogContent>
        <div>
          <Typography variant="subtitle1" component="h3" className={classes.prompt}>
            Are you sure you want to <br />
            DENY APPLICATION?
          </Typography>
          <InputLabel className={classes.remarksLabel} shrink={false}>Remarks</InputLabel>
          <TextField
            placeholder="State reason"
            multiline
            variant="outlined"
            rows="7"
            autoFocus
            fullWidth={fullWidth}
          />

        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={closeModal}>YES, DENY</Button>
        <Button variant="contained" onClick={closeModal}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
}
