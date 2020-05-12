import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Typography } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import { AccessPass } from '../../../../../common/constants/AccessPass';

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
  fieldContainer: {
    paddingBottom: 12,
    '& > *': {
      width: '90%',
    },
  },
}));

/**
 * To make editable: supply values to readonly, name, and handleChange
 */
const Field = ({ label, value, isLoading, name, readonly, handleChange }) => {
  const classes = useStyles();

  return (
    <Box className={classes.fieldContainer}>
      {readonly
        ? <>
          <Typography className={classes.label}>{label}</Typography>
          {isLoading
            ? <Skeleton variant="rect" width={100} height={14} />
            : <Typography className={classes.value}>{value}</Typography>
          }
        </>
        : <FormField
          name={name}
          placeholder={label.toUpperCase()}
          variant="filled"
          label={label}
          value={value}
          onChange={handleChange}
          disabled={isLoading}
          type="text"
        />
      }
    </Box>
  );
};

const FormField = styled(TextField)({

});


Field.defaultProps = {
  readonly: true,
  isLoading: false,
}

Field.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  readonly: PropTypes.bool,
  name: PropTypes.string,
  handleChange: PropTypes.func
};

export default Field;
