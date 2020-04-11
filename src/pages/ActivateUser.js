import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import qs from 'query-string';

import { Colors } from '../common/constants/Colors';
import { CenteredForm } from '../common/components/CenteredForm';
import { useActivateApprover } from '../common/hooks/useActivateApprover';

const MIN_LENGTH = 12;
/** At least 12, at least 1 upper, 1 lower, 1 symbol. */
// TODO remove the 11 value - already checked by min()?
const REGEX_UPPER_LOWER_ALPHANUMERIC = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).(?=.*[#$^+=!*()@%&]).{11,}$/;

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Please confirm your password.')
    .min(MIN_LENGTH, `At least ${MIN_LENGTH} characters.`)
    .matches(
      REGEX_UPPER_LOWER_ALPHANUMERIC,
      `Please at least one of each: an uppercase letter, a lowercase letter,  a number, and a symbol.`),
  confirmPassword: yup.string().when('password', {
    is: (val) => val && val.length >= MIN_LENGTH,
    then: yup
      .string()
      .oneOf([yup.ref('password')], "Please confirm your chosen password.")
  }),
});
export const ActivateUser = () => {
  const location = useLocation();
  const { push } = useHistory();

  const [username, setUsername] = useState(null);
  const [activationCode, setActivationCode] = useState(null);
  const [isSomethingWentWrong, setIsSomethingWentWrong] = useState(false);

  const { execute, isLoading, error, httpResponse } = useActivateApprover();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ password }) => {
      execute({ username, password, activationCode });
    },
    validationSchema,
  });

  useEffect(() => {
    const { username: parsedUsername, activationCode: parsedActivationCode } = qs.parse(
      location.search
    );

    if (!parsedUsername || !parsedActivationCode) {
      push('/page-not-found');
      return;
    }

    setUsername(parsedUsername);
    setActivationCode(parsedActivationCode);
  }, [activationCode, location, push]);

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
          <Typography component="label" htmlFor="password">
            Set Password
          </Typography>
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
          <Typography component="label" htmlFor="confirmPaslsword">
            Confirm Password
          </Typography>
          <FormField
            name="confirmPassword"
            placeholder="Confirm Password"
            label=""
            type="password"
            variant="outlined"
            value={values.confirmPassword}
            onChange={handleChange}
            helperText={errors.confirmPassword}
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
