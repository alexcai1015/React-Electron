import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';

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
    fontSize: 22,
    color: theme.palette.headerTextGray,
    alignItems: 'center',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  subHeaderText: {
    fontWeight: '300',
    fontSize: 16,
    color: theme.palette.headerTextGray,
    alignItems: 'center',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  headerContainer: { flex: '1 1' },
}));

const Header = ({ handleClose, text, validUntil, subText }) => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.headerText}>{text}</Typography>
        <Typography className={classes.subHeaderText}>{validUntil}</Typography>
        <Typography className={classes.subHeaderText}>{subText}</Typography>
      </Box>
      <Box className={classes.closeButtonWrapper} onClick={handleClose}>
        <Close />
      </Box>
    </Box>
  );
};

Header.propTypes = {
  handleClose: PropTypes.func.isRequired,
  text: PropTypes.string,
  subText: PropTypes.string,
  validUntil: PropTypes.string,
};

export default Header;
