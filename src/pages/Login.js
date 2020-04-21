import React, { useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import logo from '../assets/logo_purple_title.svg';
import { useLogin } from '../common/hooks';

const schema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const Login = () => {
  const { push } = useHistory();
  const { execute, httpResponse, error, data, isLoading } = useLogin();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      execute({ username, password });
    },
    validationSchema: schema,
  });

  useEffect(() => {
    if (httpResponse && httpResponse.status === 200) {
      push('/');
    }
  }, [data, push, httpResponse, isLoading]);

  return (
    <FormWrapper container direction="column" justify="center" alignItems="center">
      <form onSubmit={handleSubmit} style={{ width: 367 }} autoComplete="off">
        <ImageWrapper>
          <img src={logo} height="250px" width="310px" alt="Logo" title={`v${process.env.REACT_APP_VERSION}`} />
        </ImageWrapper>

        <Box>
          <Typography component="label" htmlFor="username">
            Username
          </Typography>
          <FormField
            name="username"
            placeholder="Enter Username"
            type="text"
            variant="outlined"
            value={values.username}
            onChange={handleChange}
            disabled={isLoading}
          />
        </Box>
        <Box>
          <Typography component="label" htmlFor="password">
            Password
          </Typography>
          <FormField
            name="password"
            placeholder="Enter Password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            disabled={isLoading}
          />
        </Box>

        {error && (
          <Box>
            <TypographyError>Incorrect username & password. Please try again.</TypographyError>
          </Box>
        )}
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          Sign In
        </SubmitButton>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled(Grid)({
  height: '100vh',
});

const ImageWrapper = styled(Box)({
  textAlign: 'center',
  marginBottom: 74,
});

const FormField = styled(TextField)({
  width: '100%',
  marginBottom: 22,
});

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransforma: 'capitalize',
  boxShadow: 'none',
  backgroundColor: theme.palette.success.main,
  '&:hover': {
    backgroundColor: theme.palette.success.main,
    boxShadow: 'none',
  },
}));

const TypographyError = styled(Typography)({
  color: 'red',
});
