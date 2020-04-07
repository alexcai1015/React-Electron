import React, { useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import logo from '../assets/logo_purple_title.svg';
import { useLogin } from '../common/hooks';
import { GoogleAnalytics } from '../common/components/GoogleAnalytics';

import classes from './login.module.css';

const schema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const Login = ({ history }) => {
  const { execute, httpResponse, error, data, isLoading } = useLogin();

  useEffect(() => {
    if (httpResponse && httpResponse.status === 200) {
      history.push('/');
    }
  }, [data, history, httpResponse, isLoading]);

  const handleOnSubmit = ({ username, password }) => {
    execute({ username, password });
  };

  return (
    <>
      <GoogleAnalytics />

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={schema}
        onSubmit={handleOnSubmit}
      >
        {({ handleChange, values }) => (
          <div className={classes.container}>
            <img src={logo} width="317" height="252" alt="Logo" title="Logo" />
            <Form className={classes.formWrapper}>
              <div className={classes.inputWrapper}>
                <TextField
                  className={classes.input}
                  name="username"
                  placeholder="Enter Username"
                  label=""
                  type="text"
                  variant="outlined"
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.inputWrapper}>
                <TextField
                  className={classes.input}
                  name="password"
                  placeholder="Enter Password"
                  label=""
                  type="password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              {error && (
                <div>
                  <h4 style={{ color: 'red' }}>Incorrect username & password. Please try again.</h4>
                </div>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                Sign In
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

Login.propTypes = {};
