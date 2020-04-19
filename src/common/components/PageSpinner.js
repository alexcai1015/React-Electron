import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { theme } from '../../theme';

import spinner from '../../assets/rapidpass_v1.gif';

const CenteredWrapper = styled(Grid)(({ theme }) => ({
  height: '100vh',
}));

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.mainPurple
}));


const PageSpinner = () => (
  <CenteredWrapper container direction="column" justify="center" alignItems="center">
    <Spinner size={200} thickness={4} />
  </CenteredWrapper>
);

export default PageSpinner;

