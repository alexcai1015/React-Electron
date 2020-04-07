import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField, Button, Box } from '@material-ui/core';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Colors } from '../common/constants/Colors';
import { CenteredForm } from '../common/components/CenteredForm';
import { useActivateApprover } from '../common/hooks/useActivateApprover';

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().when('password', {
    is: (val) => val && val.length > 0,
    then: yup
      .string()
      .oneOf([yup.ref('password')], "Password Doesn't Match")
      .required('Please confirm your password'),
  }),
});

export const ActivateUser = () => {
  const location = useLocation();
  const { push } = useHistory();

  const [username, setUsername] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [isSomethingWentWrong, setIsSomethingWentWrong] = useState(false);

  const { execute, isLoading, error, httpResponse } = useActivateApprover(username);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ password }) => {
      execute({ password, activationCode });
    },
    validationSchema,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setUsername(params.get('username'));
    setActivationCode(params.get('activationCode'));
  }, [location]);

  useEffect(() => {
    if (username === null || activationCode === null) push('/page-not-found');
  }, [push, username, activationCode]);

  useEffect(() => {
    if (httpResponse && httpResponse.status === 200) {
      setTimeout(() => {
        push('/');
      }, 1500);
    }
  }, [httpResponse, push]);

  useEffect(() => {
    if (error !== null) setIsSomethingWentWrong(true);

    setTimeout(() => {
      setIsSomethingWentWrong(false);
    }, 2000);
  }, [error]);

  useEffect(() => {
    return () => {
      setUsername('');
      setActivationCode('');
      setIsSomethingWentWrong(false);
    };
  }, []);

  return (
    <CenteredForm>
      <form onSubmit={handleSubmit} style={{ width: 367 }}>
        <FormFieldWrapper>
          <label htmlFor="password">Set Password</label>
          <FormField
            name="password"
            placeholder="Set Password"
            label=""
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            helperText={errors.password}
            error={!!errors.password}
            disabled={isLoading}
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <label htmlFor="confirmPaslsword">Confirm Password</label>
          <FormField
            name="confirmPassword"
            placeholder="Confirm Password"
            label=""
            type="password"
            variant="outlined"
            value={values.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            disabled={isLoading}
          />
        </FormFieldWrapper>

        {httpResponse && httpResponse.status === 200 && (
          <SuccessMessage>
            <CheckCircleIcon />
            <span>Successfuly Activated!</span>
          </SuccessMessage>
        )}

        {isSomethingWentWrong && (
          <ErrorMessage>
            <ErrorIcon />
            <span>Something went wrong. Please Try Again.</span>
          </ErrorMessage>
        )}

        {!!errors.confirmPassword && (
          <ErrorMessage>
            <ErrorIcon />
            <span>{errors.confirmPassword}</span>
          </ErrorMessage>
        )}

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          Activate Account
        </SubmitButton>
      </form>
    </CenteredForm>
  );
};

const FormField = styled(TextField)({
  width: '100%',
  marginTop: 5,
});

const FormFieldWrapper = styled(Box)({
  marginBottom: 22,
});

const BaseMessage = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  marginBottom: 25,
  '& span': {
    marginLeft: 10,
  },
});

const SuccessMessage = styled(BaseMessage)({
  color: Colors.ApprovalGreen,
});

const ErrorMessage = styled(BaseMessage)({
  color: Colors.DenialDarkRed,
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
