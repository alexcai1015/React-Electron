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

const AccessPassDetailsModal = ({ open, handleClose, passDetails }) => {
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
        <PassDetails handleClose={handleClose} details={passDetails || {}} />
      </div>
    </Dialog>
  );
};

AccessPassDetailsModal.defaultProps = {
  open: true,
  passDetails: {},
};

AccessPassDetailsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  passDetails: PropTypes.shape({
    aporType: PropTypes.string,
    company: PropTypes.string,
    contactNumber: PropTypes.string,
    destCity: PropTypes.string,
    destName: PropTypes.string,
    destProvince: PropTypes.string,
    destStreet: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    idType: PropTypes.string,
    name: PropTypes.string,
    passType: PropTypes.string,
    referenceId: PropTypes.string,
    remarks: PropTypes.string,
  }),
};

export default AccessPassDetailsModal;
