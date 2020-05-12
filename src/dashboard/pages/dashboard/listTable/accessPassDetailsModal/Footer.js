import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  footer: {
    borderTop: '1px solid #c4c4c4',
    display: 'flex',
    alignItems: 'center',
    padding: '16px 40px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '16px 24px',
      fontSize: 18,
    },
  }
}));

const Footer = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <div className={classes.grow} />
      {children}
    </Box>
  );
}

Footer.propTypes = {
  children: PropTypes.node
}

export default Footer;