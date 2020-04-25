import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Box, Typography, Input } from '@material-ui/core';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { getUsername } from '../store/slices';
import { CenteredForm } from '../common/components/CenteredForm';
import { PasswordPeeker } from '../common/components/PasswordPeeker';
import { useChangePassword } from '../common/hooks/useChangePassword';

const MIN_LENGTH = 12;

/** At least 12, at least 1 upper, 1 lower, 1 symbol. */
const REGEX_UPPER_LOWER_ALPHANUMERIC = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).(?=.*[#$^+=!*()@%&]).{11,}$/;

const validationSchema = yup.object({
  currentPassword: yup.string().required('Please provide your old password.'),
  password: yup
    .string()
    .required('Please provide your password.')
    .min(MIN_LENGTH, `At least ${MIN_LENGTH} characters.`)
    .matches(
      REGEX_UPPER_LOWER_ALPHANUMERIC,
      `Please at least one of each: an uppercase letter, a lowercase letter,  a number, and a symbol.`
    ),
  confirmPassword: yup.string().when('password', {
    is: (val) => val && val.length >= MIN_LENGTH,
    then: yup.string().oneOf([yup.ref('password')], 'Please confirm your chosen password.'),
  }),
});

export const ChangePassword = () => {
  const { push } = useHistory();
  const username = useSelector(getUsername);

  const [isSomethingWentWrong, setIsSomethingWentWrong] = useState(false);

  const { execute, isLoading, error, httpResponse } = useChangePassword();

  const { handleSubmit, handleChange, setValues, values, errors } = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showPassword: false,
      showConfirmPassword: false,
    },
    onSubmit: ({ currentPassword, password }) => {
      execute({ username, currentPassword, newPassword: password });
    },
    validationSchema,
  });

  const handleShowCurrentPassword = (toggle) => {
    setValues({ ...values, showCurrentPassword: toggle });
  };

  const handleShowPassword = (toggle) => {
    setValues({ ...values, showPassword: toggle });
  };

  const handleShowConfirmPassword = (toggle) => {
    setValues({ ...values, showConfirmPassword: toggle });
  };


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
      setIsSomethingWentWrong(false);
    };
  }, []);

  return (
    <CenteredForm formTitle="Change Password">
      <form onSubmit={handleSubmit} style={{ width: 367 }}>
        <FormFieldWrapper>
          <Typography component="label" htmlFor="currentPassword">
            Old Password
          </Typography>
          <FormField
            name="currentPassword"
            placeholder="Set Old Password"
            label=""
            variant="outlined"
            onChange={handleChange}
            value={values.currentPassword}
            helperText={errors.currentPassword}
            error={!!errors.currentPassword}
            disabled={isLoading}
            type={values.showCurrentPassword ? 'text' : 'password'}
            endAdornment={
              <PasswordPeeker onPressHold={handleShowCurrentPassword} value={values.showCurrentPassword} />
            }

          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <Typography component="label" htmlFor="password">
            Set Password
          </Typography>
          <FormField
            name="password"
            placeholder="Set Password"
            label=""
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            helperText={errors.password}
            error={!!errors.password}
            disabled={isLoading}
            type={values.showPassword ? 'text' : 'password'}
            endAdornment={
              <PasswordPeeker onPressHold={handleShowPassword} value={values.showPassword} />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <Typography component="label" htmlFor="confirmPassword">
            Confirm Password
          </Typography>
          <FormField
            name="confirmPassword"
            placeholder="Confirm Password"
            label=""
            variant="outlined"
            value={values.confirmPassword}
            onChange={handleChange}
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            disabled={isLoading}
            type={values.showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <PasswordPeeker onPressHold={handleShowConfirmPassword} value={values.showConfirmPassword} />
            }
          />
        </FormFieldWrapper>

        {httpResponse && httpResponse.status === 200 && (
          <SuccessMessage>
            <CheckCircleIcon />
            <span>Password change successful.</span>
          </SuccessMessage>
        )}

        {isSomethingWentWrong && (
          <ErrorMessage>
            <ErrorIcon />
            <span>Password change failed.</span>
          </ErrorMessage>
        )}

        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          Change Password
        </SubmitButton>
      </form>
    </CenteredForm>
  );
};

const FormField = styled(Input)({
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

const SuccessMessage = styled(BaseMessage)(({ theme }) => ({
  color: theme.palette.approvalGreen,
}));

const ErrorMessage = styled(BaseMessage)(({ theme }) => ({
  color: theme.palette.denialDarkRed,
}));

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
