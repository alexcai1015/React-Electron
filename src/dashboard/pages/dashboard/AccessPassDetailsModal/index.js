import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

import PassDetails from './Passdetails';

const useStyles = makeStyles(() => ({
  rootStyle: {
    borderRadius: 8,
  },
}));

const AccessPassDetailsModal = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="RapidPass Submission Details"
      aria-describedby="Pass Detailed Information"
      classes={{
        paper: classes.rootStyle,
      }}
    >
      <div>
        <PassDetails handleClose={handleClose} />
      </div>
    </Dialog>
  );
};

AccessPassDetailsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

AccessPassDetailsModal.defaultProps = {
  open: true,
};

export default AccessPassDetailsModal;
