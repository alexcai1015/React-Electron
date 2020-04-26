import React from 'react';
import { Typography } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';

import { CenteredForm } from '../common/components/CenteredForm';
import { theme } from '../theme';


export const Maintenance = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CenteredForm formTitle=" Maintenance Mode" showLogo>
        <Typography variant="body1" color="textSecondary">
          We'll be back soon.
      </Typography>
        <BuildIcon fontSize="large" color="primary" />
      </CenteredForm>
    </MuiThemeProvider>
  );
};

Maintenance.propTypes = {};
