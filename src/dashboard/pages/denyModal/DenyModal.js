import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { Colors } from '../../../common/constants/Colors';

const useStyles = makeStyles(theme => ({
  modalTitle: {
    borderBottom: '0.5px solid',
    textAlign: 'center'
  },
  modalContent: {
   alignItems: 'center',
   textAlign: 'center',
   width: 350
  },
  modalText: {
    margin: '20px auto 20px auto',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    display: 'inline-flex',
    margin: '20px auto 20px auto',
    '& .MuiButton-root': {
      width: 157,
      fontSize: 14,
      color: Colors.White,
      '&:hover': {
        opacity: 0.9,
        textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff'
      }
    },
    '& .MuiButtonBase-root': {
      textTransform: 'capitalize',
      borderRadius: 20,
      fontWeight: 600,
      fontFamily: 'Work Sans, sans-serif',
      margin: 4,
    }
  },
  denyAction: {
    backgroundColor: Colors.DenialRed,
    '&:hover': {
      backgroundColor: Colors.DenialRed
    }
  },
  cancelAction: {
    backgroundColor: Colors.CancelGray,
    '&:hover': {
      backgroundColor: Colors.CancelGray
    }
  },
}));

export const DenyApplicationModal = ({show, closeModal}) => {
  const classes = useStyles();
  const fullWidth = true;

  return (
    <Dialog open={show} onClose={closeModal}>
      <DialogTitle className={classes.modalTitle}>Deny Application?</DialogTitle>
      <DialogContent>
        <div className={classes.modalContent}>
          <div className={classes.modalText}>Are you sure you want to<br />DENY APPLICATION?</div>
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
      <DialogActions className={classes.actions}>
        <Button variant="contained" className={classes.denyAction} onClick={closeModal}>YES, DENY</Button>
        <Button variant="contained" className={classes.cancelAction} onClick={closeModal}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
}
