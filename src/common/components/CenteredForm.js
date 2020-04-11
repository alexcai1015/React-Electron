import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import MainLogo from './MainLogo';

export const CenteredForm = ({ children }) => {
  return (
    <FormWrapper container direction="column" justify="center" alignItems="center">
      <ImageWrapper>
        <MainLogo />
      </ImageWrapper>
      {children}
    </FormWrapper>
  );
};

CenteredForm.propTypes = {
  children: PropTypes.node.isRequired,
};

const FormWrapper = styled(Grid)({
  height: '100vh',
});

const ImageWrapper = styled(Box)({
  marginBottom: 55,
});
