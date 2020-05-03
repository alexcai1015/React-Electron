import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { PassTypeLabel } from '../../../../../common/constants/PassType';

import Header from './Header';
import Field from './Field';
import SectionTitle from './SectionTitle';
import AporType from './AporType';
import { ApprovalStatus, ApprovalStatusLabel } from '../../../../../common/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 550,
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
  }
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

export const PassDetails = ({ handleClose, details }) => {
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
      <Header handleClose={handleClose} text={`Application ${ApprovalStatusLabel[details.status.toLowerCase()]}`} />
      <Box className={classes.content}>
        <AporType aporType={details.aporType || 'N/A'} />
        <Field label="Control Code" value={details.controlCode || 'N/A'} />
        <SectionTitle title="Personal Details" />
        <Grid item xs={12} container>
          <Grid item xs={4}>
            <Field label="Name" value={details.name || 'N/A'} />
            <Field label="Email" value={details.email || 'N/A'} />
            <Field label={getReferenceIdLabel(details)} value={details.referenceId || 'N/A'} />
            <Field label="Id type" value={details.idType || 'N/A'} />
            <Field label="Id number" value={details.id || 'N/A'} />
            <Field label="Company/Institution" value={details.company || 'N/A'} />
          </Grid>
          <Grid item xs={8}>
            <Field label="Address of origin" value={addressOfOrigin || 'N/A'} />
            <Field label="Address of destination" value={addressOfDestination || 'N/A'} />
            <Field label="Remarks" value={details.remarks || 'N/A'} />
            <Field label="Pass type" value={details.passType || 'N/A'} />
            {(ApprovalStatus.Declined === details.status) &&
              <Field label="⚠️ Reason for Decline" value={details.updates} />
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

PassDetails.defaultProps = {
  details: {},
};

PassDetails.propTypes = {
  handleClose: PropTypes.func.isRequired,
  details: PropTypes.shape({
    aporType: PropTypes.string,
    company: PropTypes.string,
    referenceId: PropTypes.string,
    destCity: PropTypes.string,
    destName: PropTypes.string,
    destProvince: PropTypes.string,
    destStreet: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    idType: PropTypes.string,
    name: PropTypes.string,
    passType: PropTypes.string,
    remarks: PropTypes.string,
    status: PropTypes.string,
  }),
};
