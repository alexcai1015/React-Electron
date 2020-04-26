import React from 'react';
import { InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';

export const PasswordPeeker = ({ hint, onPressHold, value }) => (
  <InputAdornment position="end">
    <Tooltip title={hint}>
      <IconButton
        aria-label="toggle password visibility"
        onMouseDown={() => onPressHold(true)}
        onMouseUp={() => onPressHold(false)}
      >
        {value ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Tooltip>
  </InputAdornment>
);

PasswordPeeker.defaultProps = {
  hint: 'Press and hold to peek password',
};

PasswordPeeker.propTypes = {
  hint: PropTypes.string,
  onPressHold: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};
