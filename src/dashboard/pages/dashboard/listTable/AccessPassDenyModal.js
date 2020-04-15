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

const useStyles = makeStyles((theme) => ({
  dialog: {
    fontSize: 16,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    height: 70,
    borderBottom: `0.5px solid ${theme.palette.borderGray}`,
  },
  modalPrompt: {
    margin: '34px auto 26px auto',
    textAlign: 'center',
    fontWeight: 500,
  },
  remarksLabel: {
    marginBottom: 12,
    color: theme.palette.bodyTextBlack,
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
      color: theme.palette.white,
      marginLeft: 18,
      marginRight: 18,
      '&:hover': {
        opacity: 0.9,
        textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
      },
    },
  },
  denyAction: {
    backgroundColor: theme.palette.denialDarkRed,
    '&:hover': {
      backgroundColor: theme.palette.denialDarkRed,
    },
  },
  cancelAction: {
    backgroundColor: theme.palette.cancelGray,
    '&:hover': {
      backgroundColor: theme.palette.cancelGray,
    },
  },
}));

const validationSchema = Yup.object().shape({
  remarks: Yup.string().required('Required'),
});

export const AccessPassDenyModal = ({ value = {}, loading, isOpen, onClose, onSubmit }) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      remarks: '',
    },
    validationSchema,
    onSubmit: ({ remarks }) => {
      onSubmit({
        ...value,
        remarks,
      });
    },
  });

  const { handleChange, submitForm } = formik;

  return (
    <Dialog fullWidth className={classes.dialog} maxWidth="xs" open={isOpen}>
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
          disabled={loading}
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          disabled={!formik.isValid || loading}
          variant="contained"
          className={classes.denyAction}
          onClick={submitForm}
        >
          YES, DENY
        </Button>
        <Button
          variant="contained"
          className={classes.cancelAction}
          onClick={() => {
            formik.resetForm();
            handleClose();
          }}
          disabled={loading}
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AccessPassDenyModal.propTypes = {
  isOpen: PropTypes.bool,
  loading: PropTypes.bool,

  // ! TODO - shape this to access pass
  value: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AccessPassDenyModal.defaultProps = {
  isOpen: false,
};
