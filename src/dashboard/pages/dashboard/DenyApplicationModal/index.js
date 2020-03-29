import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  TextField,
  InputLabel
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Colors } from '../../../../common/constants/Colors';

const useStyles = makeStyles(theme => ({
  dialog: {
    fontSize: 16
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    height: 70,
    borderBottom: `0.5px solid ${Colors.BorderGray}`
  },
  modalPrompt: {
    margin: '34px auto 26px auto',
    textAlign: "center",
    fontWeight: 500
  },
  remarksLabel: {
    marginBottom: 12,
    color: Colors.BodyTextBlack,
    fontWeight: 500
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    display: 'inline-flex',
    margin: '20px auto 100px auto',
    '& .MuiButtonBase-root': {
      textTransform: 'capitalize',
      borderRadius: 20,
      fontWeight: 600,
      width: 160,
      fontSize: 14,
      color: Colors.White,
      marginLeft: 18,
      marginRight: 18,
      '&:hover': {
        opacity: 0.9,
        textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff'
      }
    },
  },
  denyAction: {
    backgroundColor: Colors.DenialDarkRed,
    '&:hover': {
      backgroundColor: Colors.DenialDarkRed
    }
  },
  cancelAction: {
    backgroundColor: Colors.CancelGray,
    '&:hover': {
      backgroundColor: Colors.CancelGray
    }
  },
}));

const DenyApplicationModal = ({ open, handleClose, accessPassReferenceId }) => {  
  const classes = useStyles();
  const fullWidth = true;

  if (!accessPassReferenceId) {
    return (
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Invalid Access Pass Reference ID"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialog} fullWidth={true}
      maxWidth={'xs'}>
      <DialogTitle className={classes.modalTitle}>Deny Application?</DialogTitle>
      <DialogContent>
        <div className={classes.modalPrompt}>Are you sure you want to<br />DENY APPLICATION?</div>
        <InputLabel className={classes.remarksLabel} shrink={false}>Remarks</InputLabel>
        <TextField
          placeholder="State reason"
          multiline
          variant="outlined"
          rows="7"
          fullWidth={fullWidth}
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="contained" className={classes.denyAction} onClick={handleClose}>YES, DENY</Button>
        <Button variant="contained" className={classes.cancelAction} onClick={handleClose}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DenyApplicationModal;