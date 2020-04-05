import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

import { Colors } from '../common/constants/Colors';

const useStyles = makeStyles(() => ({
  dialog: {
    textAlign: 'center',
    '& .MuiDialogActions-root': {
      display: 'block',
    },
  },
  uploadMessage: {
    padding: 30,
  },
  checkIcon: {
    color: Colors.ApprovalGreen,
    fontSize: 50,
  },
  buttonGroup: {
    '& .MuiButtonBase-root': {
      borderRadius: 20,
      fontWeight: 600,
      width: 300,
      fontSize: 14,
      color: Colors.White,
      '&:hover': {
        opacity: 0.9,
        textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
      },
    },
    paddingTop: 40,
    paddingBottom: 40,
  },
  returnButton: {
    backgroundColor: Colors.ApprovalGreen,
    '&:hover': {
      backgroundColor: Colors.ApprovalGreen,
    },
  },
}));

export const UploadSuccessModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const history = useHistory();

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialog} fullWidth maxWidth="xs">
      <DialogContent>
        <h3>Your file has been successfully uploaded.</h3>
        <div className={classes.uploadMessage}>
          <CheckCircle className={classes.checkIcon} />
          <h2>Upload Successful</h2>
        </div>
        We will send the results to individuals via SMS and email. Depending on respective agency
        approval, this is usually released within 24 - 48 hours.
      </DialogContent>
      <DialogActions className={classes.buttonGroup}>
        <Button variant="contained" className={classes.returnButton} onClick={returnToHome}>
          Return to Homepage
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UploadSuccessModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

UploadSuccessModal.defaultProps = {
  handleClose: () => {},
  open: false,
};
