import React from 'react';
import PropTypes from 'prop-types';
import PassDetails from './pass-details';

const SubmissionDetailsModal = ({ rapidPass }) => {
  return (
    <div>
      <PassDetails rapidPass={rapidPass} />
    </div>
  );
};

SubmissionDetailsModal.propTypes = {};

SubmissionDetailsModal.defaultProps = {};

export default SubmissionDetailsModal;
