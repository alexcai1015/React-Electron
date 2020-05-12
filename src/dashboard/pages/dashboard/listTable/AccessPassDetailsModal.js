import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useGetAccessPass } from '../../../../common/hooks';
import { AccessPass } from '../../../../common/constants/AccessPass';
import Footer from './accessPassDetailsModal/Footer';

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    borderRadius: 8,
  }
}));


export const AccessPassDetailsModal = ({ value = {}, isOpen, onClose, allowEdit, onSave }) => {
  const classes = useStyles();
  const { data, query, isLoading } = useGetAccessPass();

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    onClose();
  };

  useEffect(() => {
    query(value.referenceId);
  }, [query, value]);

  const details = isLoading ? value : data;

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
      <PassDetails
        details={details}
        handleClose={handleClose}
        isLoading={isLoading}
        handleEdits={handleSave} />

      {allowEdit && <Footer handleSave={handleSave} />}
    </Dialog>
  );
};

AccessPassDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  value: PropTypes.shape(AccessPass),
  onClose: PropTypes.func.isRequired,
  allowEdit: PropTypes.bool,
  onSave: PropTypes.func,
};

AccessPassDetailsModal.defaultProps = {
  isOpen: false,
  allowEdit: false
};
