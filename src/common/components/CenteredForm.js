import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import logo from '../../assets/logo_purple_title.svg';

export const CenteredForm = ({ children }) => {
  return (
    <FormWrapper container direction="column" justify="center" alignItems="center">
      <ImageWrapper>
        <img src={logo} width="317" height="252" alt="Logo" title="Logo" />
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
  marginBottom: 74,
});
