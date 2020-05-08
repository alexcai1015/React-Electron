import React from 'react';
import { Button, Grid, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import logo from '../assets/logo_purple_title.svg';

export const Login = () => {
  const { location } = useHistory();
  const { state } = location;
  const error = state?.error === true;
  return (
    <FormWrapper container direction="column" justify="center" alignItems="center">
      <form style={{ width: 367 }} autoComplete="off">
        <ImageWrapper>
          <img
            src={logo}
            height="250px"
            width="310px"
            alt="Logo"
            title={`v${process.env.REACT_APP_VERSION}`}
          />
        </ImageWrapper>

        {error && (
          <Box>
            <TypographyError>An error has occured, we could not log you in.</TypographyError>
          </Box>
        )}

        <SubmitButton type="submit" variant="contained" color="primary" fullWidth href="auth/login">
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
