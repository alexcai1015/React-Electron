import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useGetAccessPass } from '../../../../common/hooks';
import { AccessPass } from '../../../../common/constants/AccessPass';

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    borderRadius: 8,
  },
  grow: {
    flexGrow: 1,
  },
  footer: {
    borderTop: '1px solid #c4c4c4',
    display: 'flex',
    alignItems: 'center',
    padding: '16px 40px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '12px 24px',
      fontSize: 18,
    },
  },
  edit: {
    color: theme.palette.linkPurple,
    textDecoration: 'none',
    fontSize: 16,
  },
  save: {
    textDecoration: 'none',
    fontSize: 16,
  },
}));

const Footer = ({ handleSave }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => { setIsEdit(true); }
  return (
    <Box className={classes.footer}>
      <div className={classes.grow} />
      {isEdit ? (
        <Button
          variant="outlined"
          color="primary"
          className={classes.save}
          href="#"
          onClick={handleSave}>
          Save
        </Button>
      ) : (
          <Button className={classes.edit} onClick={handleEdit}>
            Edit
          </Button>
        )
      }
    </Box>
  );
}

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
