import React, { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useEditDevice } from '../../common/hooks';
import Field from './editCheckpointDevice/Field';

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required('Required', 'Mobile number is required')
    .matches(/^0(9)\d{9}$/, 'Please input a valid number ex. 09*********'),
  id: Yup.string().required('Required', 'Device ID is required'),
  status: Yup.string().max(250, 'Remarks should be maximum of 250 characters'),
  brand: Yup.string().required('Required', 'Device ID is required'),
  model: Yup.string().required('Required', 'Device ID is required'),
});
export const EditCheckpointDeviceModal = ({
  deviceDetails,
  isOpen = false,
  handleCloseModal = () => {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { execute: executeEditDevice, isLoading, isSuccess } = useEditDevice();
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      ...deviceDetails,
    },
    onSubmit: async ({ mobileNumber, brand, model, imei, status }) => {
      await executeEditDevice(deviceDetails.id, {
        id: deviceDetails.id.toUpperCase(),
        ...(mobileNumber && { mobileNumber: mobileNumber.trim() }),
        ...(brand && { brand: brand.trim() }),
        ...(model && { model: model.trim() }),
        ...(imei && { imei: imei.trim() }),
        ...(status && { status: status.trim() }),
      });
    },
    validationSchema,
  });

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess, handleCloseModal]);

  const handleEditClicked = () => {
    setIsEditing(true);
  };

  return (
    <>
      <Dialog
        maxWidth="xs"
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">View Device Record</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {/* <TextField autoFocus label="Device ID" value={values.id} fullWidth readonly /> */}
                <Field
                  id="id"
                  name="id"
                  label="Device ID"
                  readonly={true}
                  value={values.id}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <StyledTextField
                  autoFocus
                  id="imei"
                  label="IMEI"
                  // disabled={deviceDetails.imei.length ? true : false}
                  value={values.imei}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: (!isEditing || deviceDetails.imei.length) ? true : false,
                  }}
                /> */}
                <Field
                  id="imei"
                  name="imei"
                  label="IMEI"
                  value={values.imei}
                  onChange={handleChange}
                  fullWidth
                  isLoading={isLoading}
                  readonly={!isEditing || deviceDetails.imei.length ? true : false}
                  error={errors.imei}
                  touched={touched.imei}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <StyledTextField
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
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                /> */}

                <Field
                  id="mobileNumber"
                  name="mobileNumber"
                  label="Mobile Number"
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isLoading={isLoading}
                  error={errors.mobileNumber}
                  touched={touched.mobileNumber}
                  readonly={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <StyledTextField
                  id="brand"
                  label="Mobile Brand"
                  value={values.brand}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  // helperText={touched.brand && errors.brand ? errors.brand : ' '}
                  // error={touched.brand && errors.brand ? true : false}
                  fullWidth
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                /> */}

                <Field
                  id="brand"
                  name="brand"
                  label="Mobile Brand"
                  value={values.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isLoading={isLoading}
                  error={errors.brand}
                  touched={touched.brand}
                  readonly={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <StyledTextField
                  id="model"
                  label="Mobile Model"
                  value={values.model}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  // helperText={touched.model && errors.model ? errors.model : ' '}
                  // error={touched.model && errors.model ? true : false}
                  fullWidth
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                /> */}
                <Field
                  id="model"
                  name="model"
                  label="Mobile Model"
                  value={values.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isLoading={isLoading}
                  error={errors.model}
                  touched={touched.model}
                  readonly={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <StyledTextField
                  id="status"
                  label="Remarks"
                  multiline
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.status && errors.status ? errors.status : ' '}
                  error={touched.status && errors.status ? true : false}
                  fullWidth
                  InputProps={{
                    readOnly: !isEditing,
                  }}
                /> */}
                <Field
                  id="status"
                  name="status"
                  label="Remarks"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isLoading={isLoading}
                  error={errors.status}
                  touched={touched.status}
                  readonly={!isEditing}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
            {!isEditing && (
              <Button type="submit" color="primary" onClick={handleEditClicked}>
                Edit
              </Button>
            )}
            {isEditing && (
              <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
                {isLoading && <CircularProgress size={22} />}
                {!isLoading && 'Save'}
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
