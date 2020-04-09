import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import MainLogo from '../common/components/MainLogo';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
});

export const Maintenance = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <MainLogo />
      <Typography>Maintenance Mode</Typography>
    </Box>
  );
};

Maintenance.propTypes = {};
