import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export const useConfirmModal = ({
  open,
  onConfirm,
  onClose,
  onCancel,
  contentText = 'Are you sure you want to apply your changes?',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  titleText = 'Confirmation',
}) => {
  return {
    modal: (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onConfirm} color="primary" variant="contained">
            {confirmButtonText}
          </Button>
          <Button onClick={onCancel} color="primary">
            {cancelButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    ),
  };
};
