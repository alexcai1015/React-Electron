import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    color: '#989898',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  aporTypeSection: {
    marginBottom: 20,
  },
}));

const AporType = ({ aporType }) => {
  const classes = useStyles();

  return (
    <Box className={classes.aporTypeSection}>
      <Typography className={classes.label}>Apor Type</Typography>
      <Typography className={classes.title}>{aporType}</Typography>
    </Box>
  );
};

AporType.defaultProps = {
  aporType: 'N/A',
};

AporType.propTypes = {
  aporType: PropTypes.string,
};

export default AporType;
