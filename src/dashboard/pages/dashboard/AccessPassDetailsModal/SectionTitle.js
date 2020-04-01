import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  sectionTitle: {
    color: '#5E35B1',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitleContainer: {
    marginBottom: 14,
  },
}));

const SectionTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <Box className={classes.sectionTitleContainer}>
      <Typography className={classes.sectionTitle}>{title}</Typography>
    </Box>
  );
};

SectionTitle.defaultProps = {};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
