import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PassTypeLabel } from '../../../../../common/constants/PassType';
import { ApprovalStatus, ApprovalStatusLabel } from '../../../../../common/constants';
import { AccessPass } from '../../../../../common/constants/AccessPass';

import Header from './Header';
import Field from './Field';
import SectionTitle from './SectionTitle';
import AporType from './AporType';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 620,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '16px 64px 20px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '16px 24px',
    },
  },
  buttons: {
    display: 'flex'
  },
  edit: {
    color: theme.palette.linkBlue,
    textDecoration: 'underline',
    fontSize: 16,
  },
}));

const formatAddress = ({ name, street, city, province }) => {
  const address = ['', name, street, city, province].filter((a) => `${a}`.trim());
  return address.join() ? address.join(', ') : 'N/A';
};

const getReferenceIdLabel = (details) => {
  const { passType = '' } = details;
  const label = PassTypeLabel[passType.toLowerCase()];
  return label ? label.display : '';
};

const PassDetailsButtons = ({ handleSave }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => { setIsEdit(true); }
  return (
    <Box className={classes.buttons}>
      {isEdit ? (
        <Button
          variant="outlined"
          color="primary"
          href="#"
          onClick={handleSave}>
          Save
        </Button>
      ) : (
          <Button className={classes.view} onClick={handleEdit}>
            Edit
          </Button>
        )
      }
    </Box>
  );
}

export const PassDetails = ({ handleClose, details, isLoading, allowEdit, handleSave }) => {
  const classes = useStyles();
  const addressOfDestination = formatAddress({
    name: details.destName,
    street: details.destStreet,
    city: details.destCity,
    province: details.destProvince,
  });
  const addressOfOrigin = formatAddress({
    name: details.originName,
    street: details.originStreet,
    city: details.originCity,
    province: details.originProvince,
  });

  return (
    <Box className={classes.container}>
      <Header
        handleClose={handleClose}
        text={`Application ${ApprovalStatusLabel[details.status.toLowerCase()]}`}
        subText={`Issued By: ${details.issuedBy ? details.issuedBy : 'N/A'}`}
      />
      <Box className={classes.content}>
        <AporType aporType={details.aporType} />
        <Grid item xs={12} container>
          <Grid item xs={4}>
            <Field label="Control Code" value={details.controlCode} isLoading={isLoading} />
          </Grid>
          <Grid item xs={8}>
            <Field
              label="Notified"
              value={details.notified ? `✅ Yes` : `🚫 No`}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>

        <SectionTitle title="Personal Details" />
        <Grid item xs={12} container>
          <Grid item xs={4}>
            <Field label="Name" value={details.name} />
            <Field label="Email" value={details.email} />
            <Field label={getReferenceIdLabel(details)} value={details.referenceId} />
            <Field label="Id type" value={details.idType} />
            <Field label="Id number" value={details.id} />
            <Field label="Company/Institution" value={details.company} />
          </Grid>
          <Grid item xs={8}>
            <Field label="Address of origin" value={addressOfOrigin} />
            <Field label="Address of destination" value={addressOfDestination} />
            <Field label="Remarks" value={details.remarks} />
            <Field label="Pass type" value={details.passType} />
            {ApprovalStatus.Declined === details.status && (
              <Field label="⚠️ Reason for Decline" value={details.updates} />
            )}
          </Grid>
        </Grid>
      </Box>
      {allowEdit && <PassDetailsButtons handleSave={handleSave} />}
    </Box>
  );
};

PassDetails.defaultProps = {
  details: {},
  isLoading: false,
};

PassDetails.propTypes = {
  details: PropTypes.shape(AccessPass),
  isLoading: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func,
  allowEdit: PropTypes.bool,
};
