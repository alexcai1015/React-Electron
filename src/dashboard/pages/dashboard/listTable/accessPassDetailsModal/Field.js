import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.labelGray,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  value: {
    color: theme.palette.fieldValueGray,
    overflowWrap: 'break-word',
    fontSize: 14,
    fontWeight: '500',
  },
  fieldContainer: { paddingBottom: 12 },
}));

const Field = ({ label, value, isLoading }) => {
  const classes = useStyles();

  return (
    <Box className={classes.fieldContainer}>
      <Typography className={classes.label}>{label}</Typography>
      {isLoading ? (
        <Skeleton variant="rect" width={100} height={14} />
      ) : (
        <Typography className={classes.value}>{value}</Typography>
      )}
    </Box>
  );
};

Field.defaultProps = {
  value: 'N/A',
  isLoading: false,
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Field;
