import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  makeStyles,
} from '@material-ui/core';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { useUpdateAccessPass } from '../../../../../common/hooks';
import { Colors } from '../../../../../common/constants/Colors';
import { denyAccessPassById } from '../../../../../store/slices';
import { useSnackbar } from '../../../../../hooks';

const useStyles = makeStyles(() => ({
  dialog: {
    fontSize: 16,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    height: 70,
    borderBottom: `0.5px solid ${Colors.BorderGray}`,
  },
  modalPrompt: {
    margin: '34px auto 26px auto',
    textAlign: 'center',
    fontWeight: 500,
  },
  remarksLabel: {
    marginBottom: 12,
    color: Colors.BodyTextBlack,
    fontWeight: 500,
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
        textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
      },
    },
  },
  denyAction: {
    backgroundColor: Colors.DenialDarkRed,
    '&:hover': {
      backgroundColor: Colors.DenialDarkRed,
    },
  },
  cancelAction: {
    backgroundColor: Colors.CancelGray,
    '&:hover': {
      backgroundColor: Colors.CancelGray,
    },
  },
}));

const validationSchema = Yup.object().shape({
  remarks: Yup.string().required('Required'),
});

export const DenyApplicationModal = ({ accessPass, open, onClose }) => {
  const classes = useStyles();

  const { referenceId: accessPassReferenceId, id } = accessPass || {};

  const { execute: executeUpdate } = useUpdateAccessPass();

  const { showSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      remarks: '',
    },
    isInitialValid: false,
    validationSchema,
    onSubmit: async ({ remarks }) => {
      const responseData = await executeUpdate(accessPassReferenceId, {
        status: 'DECLINED',
        remarks,
      });

      showSnackbar({
        message: 'An error occured.',
        severity: 'error',
      });

      if (!responseData) {
        return;
      }

      showSnackbar({
        message: `Denied application with Reference ID: ${accessPassReferenceId}`,
        severity: 'warning',
      });

      dispatch(denyAccessPassById(id));
      onClose();
    },
  });

  const { handleChange, submitForm } = formik;

  return (
    <>
      <Dialog fullWidth className={classes.dialog} maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle className={classes.modalTitle}>Deny Application?</DialogTitle>
        <DialogContent>
          <div className={classes.modalPrompt}>
            Are you sure you want to
            <br />
            DENY APPLICATION?
          </div>
          <InputLabel className={classes.remarksLabel} shrink={false}>
            Remarks
          </InputLabel>

          <TextField
            fullWidth
            multiline
            name="remarks"
            rows="7"
            placeholder="State reason"
            variant="outlined"
            error={formik.touched && !formik.isValid && !!formik.errors.remarks}
            helperText={formik.touched && !formik.isValid && formik.errors.remarks}
            values={formik.values.remarks}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button
            disabled={!formik.isValid}
            variant="contained"
            className={classes.denyAction}
            onClick={submitForm}
          >
            YES, DENY
          </Button>
          <Button variant="contained" className={classes.cancelAction} onClick={onClose}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DenyApplicationModal.propTypes = {
  // ! FIXME: proper shape for `accessPass` prop
  // eslint-disable-next-line react/forbid-prop-types
  accessPass: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DenyApplicationModal;
