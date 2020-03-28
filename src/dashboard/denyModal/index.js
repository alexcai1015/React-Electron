import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  center: {
   textAlign: 'center'
  },
}));

export const DenyApplicationModal = () => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  const openPopup = () => {
    setShow(true);
  };

  const closePopup = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={openPopup}>
        Deny
      </Button>
      <Dialog open={show} onClose={closePopup}>
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
                fullWidth="true"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={closePopup}>YES, DENY</Button>
          <Button variant="contained" onClick={closePopup}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
