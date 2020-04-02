import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Field from './Field';
import SectionTitle from './SectionTitle';
import AporType from './AporType';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 550,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '16px 64px 20px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '16px 24px',
    },
  },
}));

const formatAddress = ({ name, street, city, province }) => {
  let address = null;

  if (name) {
    address = `${name}`;
  }

  if (street) {
    address = address ? `${address}, ${street}` : `${street}`;
  }

  if (city) {
    address = address ? `${address}, ${city}` : `${city}`;
  }

  if (province) {
    address = address ? `${address}, ${province}` : `${province}`;
  }

  if (!address) return 'N/A';

  return address;
};

const getReferenceIdLabel = (details) => {
  const label =
    details && details.passType && details.passType.toUpperCase() === 'VEHICLE'
      ? 'Plate Number'
      : 'Contact Number';
  return label;
};

const Passdetails = ({ handleClose, details }) => {
  const classes = useStyles();
  const addressOfDestination = formatAddress({
    name: details.destName,
    street: details.destStreet,
    city: details.destCity,
    province: details.destProvince,
  });

  // There's no address of origin from the backend.
  const addressOfOrigin = 'N/A';
  return (
    <Box className={classes.container}>
      <Header handleClose={handleClose} />
      <Box className={classes.body}>
        <AporType aporType={details.aporType || 'N/A'} />
        <SectionTitle title="Personal Details" />
        <Grid item xs={12} container>
          <Grid item xs={4}>
            <Field label="Name" value={details.name || 'N/A'} />
            <Field label="Email" value={details.email || 'N/A'} />
            <Field label={getReferenceIdLabel(details)} value={details.referenceId || 'N/A'} />
            <Field label="Id type" value={details.idType || 'N/A'} />
            <Field label="Id number" value={details.id || 'N/A'} />
            <Field label="Company" value={details.company || 'N/A'} />
          </Grid>
          <Grid item xs={8}>
            <Field label="Address of origin" value={addressOfOrigin || 'N/A'} />
            <Field label="Address of destination" value={addressOfDestination || 'N/A'} />
            <Field label="Remarks" value={details.remarks || 'N/A'} />
            <Field label="Pass type" value={details.passType || 'N/A'} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

Passdetails.defaultProps = {
  details: {},
};

Passdetails.propTypes = {
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
  }),
};

export default Passdetails;
