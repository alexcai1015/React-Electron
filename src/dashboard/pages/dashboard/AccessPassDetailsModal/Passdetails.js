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

const Passdetails = ({ handleClose, details, aporType }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header handleClose={handleClose} />
      <Box className={classes.body}>
        <AporType aporType={aporType} />
        <SectionTitle title="Personal Details" />
        <Grid item xs={12} container>
          <Grid item xs={4}>
            <Field label="Name" value={details.name} />
            <Field label="Email" value={details.email} />
            <Field label="Contact Number" value={details.contactNumber} />
            <Field label="Id type" value={details.idType} />
            <Field label="Id number" value={details.idNumber} />
            <Field label="Company" value={details.company} />
          </Grid>
          <Grid item xs={8}>
            <Field label="Address of origin" value={details.addressOfOrigin} />
            <Field label="Address of destination" value={details.addressOfDestination} />
            <Field label="Remarks" value={details.remarks} />
            <Field label="Pass type" value={details.passType} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

Passdetails.defaultProps = {
  aporType: 'Medical Services',
  details: {
    name: 'Dela Cruz Jr., Juan',
    email: 'jdlc@gmail.com',
    contactNumber: '09178887000',
    idType: 'PRC ID',
    idNumber: '08097162',
    company: 'Rizal Medical Center',
    addressOfOrigin: '26th Street, Bonifacio Global City, Taguig, Metro Manila',
    addressOfDestination: 'Polino Street, Quezon City, Metro Manila',
    remarks: 'Nurse on duty for COVID-19',
    passType: 'Individual',
  },
};

Passdetails.propTypes = {
  aporType: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  details: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    contactNumber: PropTypes.string,
    idType: PropTypes.string,
    idNumber: PropTypes.string,
    company: PropTypes.string,
    addressOfOrigin: PropTypes.string,
    addressOfDestination: PropTypes.string,
    remarks: PropTypes.string,
    passType: PropTypes.string,
  }),
};

export default Passdetails;
