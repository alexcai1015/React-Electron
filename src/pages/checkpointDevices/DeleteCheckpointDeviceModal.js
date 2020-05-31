import React, { useEffect } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
  DialogTitle,
  styled,
} from '@material-ui/core';

import { useDeleteDevice } from '../../common/hooks';

export const DeleteCheckpointDeviceModal = ({ deviceId, isOpen, handleCloseModal = () => {} }) => {
  const { execute: executeDeleteDevice, isLoading, isSuccess } = useDeleteDevice();

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess, handleCloseModal]);

  const handleDeleteClicked = () => {
    executeDeleteDevice(deviceId);
  };

  return (
    <>
      <Dialog maxWidth="xs" open={isOpen} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Device Record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete the device?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
          <DeleteDeviceButton
            color="secondary"
            variant="contained"
            disabled={isLoading}
            onClick={handleDeleteClicked}
          >
            {isLoading && <CircularProgress size={22} />}
            {!isLoading && 'Yes'}
          </DeleteDeviceButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const DeleteDeviceButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.denialRed,
}));


