import React from 'react';
import { TextField, Button } from '@material-ui/core';

import logo from '../assets/logo_purple_title.svg';

import classes from './login.module.css';

const Login = ({ history }) => {
  return (
    <div className={classes.container}>
      <img src={logo} width="317" height="252" alt="Logo" title="Logo" />
      <form
        onSubmit={e => {
          e.preventDefault();
          history.push('/?accessCode=' + Date.now()); // TODO: replace with Login API accessCode
        }}
        className={classes.formWrapper}
      >
        <div className={classes.inputWrapper}>
          <TextField
            className={classes.input}
            name="email"
            placeholder="Enter Username"
            label=""
            type="text"
            variant="outlined"
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
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
