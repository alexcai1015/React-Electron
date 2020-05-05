import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { Error } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialog: {
    textAlign: 'center',
    '& .MuiDialogActions-root': {
      display: 'block',
    },
  },
  uploadMessage: {
    padding: theme.spacing(2),
  },
  checkIcon: {
    color: theme.palette.suspendOrange,
    fontSize: 50,
  },
  buttonGroup: {
    '& .MuiButtonBase-root': {
      borderRadius: 20,
      fontWeight: 600,
      width: 300,
      fontSize: 14,
      color: theme.palette.white,
      '&:hover': {
        opacity: 0.9,
        textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
      },
    },
    paddingTop: 40,
    paddingBottom: 40,
  },
  returnButton: {
    backgroundColor: theme.palette.suspendOrange,
    '&:hover': {
      backgroundColor: theme.palette.suspendOrange,
    },
  },
}));

const renderMessage = (message) => {
  return message.split('\n').map((item, i) => {
    const key = `${i}_key`;
    return <p key={key}>{item}</p>;
  });
};

export const UploadWarningModal = ({ open, handleClose, message }) => {
  const classes = useStyles();
  const history = useHistory();

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialog} fullWidth maxWidth="xs">
      <DialogContent>
        <div className={classes.uploadMessage}>
          <Error className={classes.checkIcon} />
        </div>
        {renderMessage(message)}
      </DialogContent>
      <DialogActions className={classes.buttonGroup}>
        <Button variant="contained" className={classes.returnButton} onClick={returnToHome}>
          Return to Homepage
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UploadWarningModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  message: PropTypes.string,
};

UploadWarningModal.defaultProps = {
  handleClose: () => {},
  open: false,
  message: '',
};
