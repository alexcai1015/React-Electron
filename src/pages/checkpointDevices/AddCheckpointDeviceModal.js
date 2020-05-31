import React, { useEffect, useCallback } from 'react';

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogTitle,
  Grid,
  styled,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCreateDevice, useToggle } from '../../common/hooks';

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required('Required', 'Mobile number is required')
    .matches(/^0(9)\d{9}$/, 'Please input a valid number ex. 09*********'),
  id: Yup.string().required('Required', 'Device ID is required'),
  status: Yup.string().max(250, 'Remarks should be maximum of 250 characters'),
  brand: Yup.string().required('Required', 'Device ID is required'),
  model: Yup.string().required('Required', 'Device ID is required'),
});
export const AddCheckpointDeviceModal = () => {
  const { execute: executeCreateDevice, isLoading, isSuccess } = useCreateDevice();
  const { on: isModalOpen, toggle: toggleModal } = useToggle();

  const { handleSubmit, handleChange, values, errors, touched, handleBlur, resetForm } = useFormik({
    initialValues: {
      id: '',
      mobileNumber: '',
      brand: '',
      model: '',
      imei: '',
      status: '',
    },
    onSubmit: async ({ id, mobileNumber, brand, model, imei, status }) => {
      await executeCreateDevice({
        id,
        ...(mobileNumber && { mobileNumber }),
        ...(brand && { brand }),
        ...(model && { model }),
        ...(imei && { imei }),
        ...(status && { status }),
      });
    },
    validationSchema,
  });

  const handleShowModal = () => {
    toggleModal();
  };

  const handleCloseModal = useCallback(() => {
    resetForm();
    toggleModal();
  }, [toggleModal, resetForm]);

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess, handleCloseModal]);

  return (
    <div>
      <AddDeviceButton
        fullWidth
        color="primary"
        size="large"
        variant="contained"
        onClick={handleShowModal}
      >
        ADD DEVICE
      </AddDeviceButton>
      <Dialog
        maxWidth="xs"
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add Device Record</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="id"
                  label="Device ID"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.id && errors.id ? errors.id : ' '}
                  error={touched.id && errors.id ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="imei"
                  label="IMEI (Optional)"
                  value={values.imei}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mobileNumber"
                  label="Mobile Number"
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.mobileNumber && errors.mobileNumber ? errors.mobileNumber : ' '
                  }
                  error={touched.mobileNumber && errors.mobileNumber ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="brand"
                  label="Mobile Brand"
                  value={values.brand}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  // helperText={touched.brand && errors.brand ? errors.brand : ' '}
                  // error={touched.brand && errors.brand ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="model"
                  label="Mobile Model"
                  value={values.model}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  // helperText={touched.model && errors.model ? errors.model : ' '}
                  // error={touched.model && errors.model ? true : false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="status"
                  label="Remarks"
                  multiline
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.status && errors.status ? errors.status : ' '}
                  error={touched.status && errors.status ? true : false}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
              {isLoading && <CircularProgress size={22} />}
              {!isLoading && 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const AddDeviceButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransforma: 'capitalize',
  boxShadow: 'none',
  backgroundColor: theme.palette.success.main,
  '&:hover': {
    backgroundColor: theme.palette.success.main,
    boxShadow: 'none',
  },
}));
