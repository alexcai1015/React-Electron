import React, { useEffect } from 'react';
import { Button, Grid, Box, Typography, Input } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import logo from '../assets/logo_purple_title.svg';
import { useLogin } from '../common/hooks';
import { PasswordPeeker } from '../common/components/PasswordPeeker';

const schema = yup.object({
  username: yup.string(),
  password: yup.string(),
});

export const Login = () => {
  const { push } = useHistory();
  const { execute, httpResponse, error, data, isLoading } = useLogin();

  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: {
      username: '',
      password: '',
      showPassword: false,
    },
    onSubmit: ({ username, password }) => {
      push('/auth/login');
    },
    validationSchema: schema,
  });

  const handleShowPassword = (toggle) => {
    setValues({ ...values, showPassword: toggle });
  };

  useEffect(() => {
    if (httpResponse && httpResponse.status === 200) {
      push('/');
    }
  }, [data, push, httpResponse, isLoading]);

  return (
    <FormWrapper container direction="column" justify="center" alignItems="center">
      <form onSubmit={handleSubmit} style={{ width: 367 }} autoComplete="off">
        <ImageWrapper>
          <img
            src={logo}
            height="250px"
            width="310px"
            alt="Logo"
            title={`v${process.env.REACT_APP_VERSION}`}
          />
        </ImageWrapper>

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          Please sign in to continue
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

const FormField = styled(Input)({
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
