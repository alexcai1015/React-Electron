import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';

import actions from './actions';
import selectors from './selectors';
import logo from './logo.png';
import classes from './login.module.css';

const loginFormik = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  }),

  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  handleSubmit: (values, { props }) => {
    const { onSignIn } = props;
    onSignIn(values);
  },
  validateOnBlur: false,
  validateOnChange: false,
  displayName: 'LoginForm',
});

const Login = ({ handleSubmit, handleChange, values, isLoading, errors }) => {
  return (
    <div className={classes.container}>
      <img src={logo} width="317" height="252" alt="Logo" title="Logo" />
      <form onSubmit={handleSubmit} className={classes.formWrapper}>
        <div className={classes.inputWrapper}>
          <TextField
            className={classes.input}
            name="email"
            placeholder="Enter Username"
            label=""
            type="text"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>
        <div className={classes.inputWrapper}>
          <TextField
            className={classes.input}
            name="password"
            placeholder="Enter Password"
            label=""
            type="password"
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password}
          />
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading} fullWidth>
          Sign In
        </Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export default compose(
  connect(
    (state) => ({
      isLoading: selectors.isLoading(state),
    }),
    {
      onSignIn: actions.login,
    }
  ),
  loginFormik
)(Login);
