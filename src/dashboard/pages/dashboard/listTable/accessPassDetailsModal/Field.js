import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Colors } from '../../../../../common/constants/Colors';

const useStyles = makeStyles(() => ({
  label: {
    color: Colors.LabelGray,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  value: {
    color: Colors.FieldValueGray,
    overflowWrap: 'break-word',
    fontSize: 14,
    fontWeight: '500',
  },
  fieldContainer: { paddingBottom: 12 },
}));

const Field = ({ label, value }) => {
  const classes = useStyles();

  return (
    <Box className={classes.fieldContainer}>
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.value}>{value}</Typography>
    </Box>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Field;
