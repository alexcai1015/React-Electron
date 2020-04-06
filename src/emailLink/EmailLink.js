import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import logo from '../assets/logo_purple_title.svg';
import { Colors } from '../common/constants/Colors';

const useStyles = makeStyles({
  container: {
    width: 317,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  formWrapper: {
    marginTop: 74
  },
  inputWrapper: {
    marginBottom: 32
  },
  input: {
    width: '100%'
  },
  inputError: {
    color: Colors.DenialRed
  },
  successPasswordMatch: {
    color: Colors.ApprovalGreen,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 25
  },
  errorPasswordMatch: {
    color: Colors.DenialRed,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 25
  },
  centerText: {
    verticalAlign: 'super'
  }
});

const schema = yup.object({
  password: yup.string().required('Password is required'),
  passwordConfirm: yup.string().required('Password is required'),
});

export const EmailLink = () => {
  const classes = useStyles();
  const [successPasswordMatch, setSuccessPasswordMatch] = React.useState(false);
  const [errorPasswordMatch, setErrorPasswordMatch] = React.useState(false);

  const handleOnSubmit = ({ password, passwordConfirm }) => {
    setSuccessPasswordMatch(false);
    setErrorPasswordMatch(false);
    if (password === passwordConfirm) {
      setSuccessPasswordMatch(true);
    }
    else {
      setErrorPasswordMatch(true);
    }
  };

  return (
    <Formik
      initialValues={{
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={schema}
      onSubmit={handleOnSubmit}
    >
      {({ handleChange, values, errors }) => (
        <div className={classes.container}>
          <img src={logo} width="317" height="252" alt="Logo" title="Logo" />
          <Form className={classes.formWrapper}>
            <div className={classes.inputWrapper}>
              <TextField
                className={classes.input}
                name="password"
                placeholder="Set Password"
                label=""
                type="password"
                variant="outlined"
                value={values.password}
                onChange={handleChange}
              />
              <span className={classes.inputError}>{errors.password}</span>
            </div>
            <div className={classes.inputWrapper}>
              <TextField
                className={classes.input}
                name="passwordConfirm"
                placeholder="Confirm Password"
                label=""
                type="password"
                variant="outlined"
                value={values.passwordConfirm}
                onChange={handleChange}
              />
              <span className={classes.inputError}>{errors.passwordConfirm}</span>
            </div>

            {successPasswordMatch && (
              <div className={classes.successPasswordMatch}>
                <CheckCircle />
                <span className={classes.centerText}>Passwords Match</span>
              </div>
            )}
            {errorPasswordMatch && (
              <div className={classes.errorPasswordMatch}>
                <Error />
                <span className={classes.centerText}>Passwords Don&#39;t Match</span>
            </div>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Activate Account
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

EmailLink.propTypes = {};
