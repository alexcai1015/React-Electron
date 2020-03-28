import React from 'react';
import PropTypes from 'prop-types';
import PassDetails from './pass-details';
import Dialog from '@material-ui/core/Dialog';

const SubmissionDetailsModal = ({ rapidPass, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="RapidPass Submission Details"
      aria-describedby="Pass Detailed Information"
    >
      <div>
        <PassDetails rapidPass={rapidPass} />
      </div>
    </Dialog>
  );
};

SubmissionDetailsModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

SubmissionDetailsModal.defaultProps = {
  open: true,
};

export default SubmissionDetailsModal;
