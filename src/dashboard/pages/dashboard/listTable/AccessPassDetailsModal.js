import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

import { PassDetails } from './accessPassDetailsModal/PassDetails';

const useStyles = makeStyles(() => ({
  rootStyle: {
    borderRadius: 8,
  },
}));

export const AccessPassDetailsModal = ({ value = {}, isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="RapidPass Submission Details"
      aria-describedby="Pass Detailed Information"
      classes={{
        paper: classes.rootStyle,
      }}
      fullWidth
    >
      <div>
        <PassDetails details={value} handleClose={handleClose} />
      </div>
    </Dialog>
  );
};

AccessPassDetailsModal.propTypes = {
  isOpen: PropTypes.bool,

  // ! TODO - shape this to access pass
  value: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
};

AccessPassDetailsModal.defaultProps = {
  isOpen: false,
};
