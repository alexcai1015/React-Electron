import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';

import { Colors } from '../../../../common/constants/Colors';

const useStyles = makeStyles((theme) => ({
  closeButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  header: {
    borderBottom: '1px solid #c4c4c4',
    display: 'flex',
    alignItems: 'center',
    padding: '16px 40px 16px 64px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '16px 24px',
      fontSize: 18,
    },
  },
  headerText: {
    fontWeight: '600',
    fontSize: 24,
    color: Colors.HeaderTextGray,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  headerContainer: { flex: '1 1' },
}));

const Header = ({ handleClose }) => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.headerText}>Application Pending</Typography>
      </Box>
      <Box className={classes.closeButtonWrapper} onClick={handleClose}>
        <Close />
      </Box>
    </Box>
  );
};

Header.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Header;
