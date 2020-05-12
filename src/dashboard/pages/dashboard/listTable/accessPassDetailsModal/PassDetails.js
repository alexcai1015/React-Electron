import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { PassTypeLabel } from '../../../../../common/constants/PassType';
import { ApprovalStatus, ApprovalStatusLabel } from '../../../../../common/constants';
import { AccessPass } from '../../../../../common/constants/AccessPass';
import { useUpdateAccessPass } from '../../../../../common/hooks/useUpdateAccessPass';

import Header from './Header';
import Field from './Field';
import SectionTitle from './SectionTitle';
import AporType from './AporType';
import Footer from './Footer';

// const validationSchema = yup.object({
//   currentPassword: yup.string().required('Please provide your old password.'),
//   password: yup
//     .string()
//     .required('Please provide your password.')
//     .min(MIN_LENGTH, `At least ${MIN_LENGTH} characters.`)
//     .matches(
//       REGEX_UPPER_LOWER_ALPHANUMERIC,
//       `Please at least one of each: an uppercase letter, a lowercase letter,  a number, and a symbol.`
//     ),
//   confirmPassword: yup.string().when('password', {
//     is: (val) => val && val.length >= MIN_LENGTH,
//     then: yup.string().oneOf([yup.ref('password')], 'Please confirm your chosen password.'),
//   }),
// });

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
  edit: {
    color: theme.palette.linkPurple,
    textDecoration: 'none',
    fontSize: 16,
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 400,
    cursor: 'pointer'
  },
  save: {
    textDecoration: 'none',
    fontSize: 16,
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 400
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

export const PassDetails = ({ handleClose, details, isLoading, allowEdit, handleEdits }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => { setIsEdit(true); }

  const { execute, isLoading: isSaving, isSuccess, error } = useUpdateAccessPass();
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      ...details
    },
    onSubmit: ({ ...fields }) => {
      const { referenceId } = details;
      execute(referenceId, { ...fields });
    },
    // validationSchema,
  });

  const source = isEdit ? values : details;

  const AddressOfOrigin = ({ readonly }) => readonly ?
    <Field label="Address of origin" value={formatAddress({
      name: details.originName,
      street: details.originStreet,
      city: details.originCity,
      province: details.originProvince,
    })} />
    : (
      <>
        <SectionTitle title="Origin" />
        <Field label="Name" readonly={!isEdit} handleChange={handleChange} name="originName" value={source.originName} />
        <Field label="Street" readonly={!isEdit} handleChange={handleChange} name="originStreet" value={source.originStreet} />
        <Field label="City" readonly={!isEdit} handleChange={handleChange} name="originCity" value={source.originCity} />
        <Field label="Province" readonly={!isEdit} handleChange={handleChange} name="originProvince" value={source.originProvince} />
      </>
    );

  const AddressOfDestination = ({ readonly }) => readonly ?
    <Field label="Address of origin" value={formatAddress({
      name: details.destName,
      street: details.destStreet,
      city: details.destCity,
      province: details.destProvince,
    })} />
    : (
      <>
        <SectionTitle title="Destination" />
        <Field label="Name" readonly={!isEdit} handleChange={handleChange} name="destName" value={source.destName} />
        <Field label="Street" readonly={!isEdit} handleChange={handleChange} name="destStreet" value={source.destStreet} />
        <Field label="City" readonly={!isEdit} handleChange={handleChange} name="destCity" value={source.destCity} />
        <Field label="Province" readonly={!isEdit} handleChange={handleChange} name="destProvince" value={source.destProvince} />
      </>
    );

  return (
    <Box className={classes.container}>
      <Header
        handleClose={handleClose}
        text={`Application ${ApprovalStatusLabel[details.status.toLowerCase()]}`}
        subText={`Issued By: ${details.issuedBy ? details.issuedBy : 'N/A'}`}
      />
      <form onSubmit={handleSubmit}>
        <Box className={classes.content}>
          <AporType aporType={details.aporType} />
          <Grid item xs={12} container>
            <Grid item xs={4}>
              <Field label="Control Code" value={source.controlCode} isLoading={isLoading} />
            </Grid>
            <Grid item xs={4}>
              <Field
                label="Notified"
                value={source.notified ? `✅ Yes` : `🚫 No`}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>

          <SectionTitle title="Personal Details" />
          <Grid item xs={12} container>
            <Grid item xs={6}>
              <Field label="Name" readonly={!isEdit} handleChange={handleChange} name="name" value={source.name} />
              <Field label="Email" readonly={!isEdit} handleChange={handleChange} name="email" value={source.email} />
              <Field label={getReferenceIdLabel(details)} value={source.referenceId} />
              <Field label="Id type" readonly={!isEdit} handleChange={handleChange} name="idType" value={source.idType} />
              <Field label="Id number" readonly={!isEdit} handleChange={handleChange} name="id" value={source.id} />
              <Field label="Company/Institution" readonly={!isEdit} handleChange={handleChange} name="company" value={source.company} />
            </Grid>
            <Grid item xs={6}>
              <Field label="Remarks" readonly={!isEdit} handleChange={handleChange} name="remarks" value={source.remarks} />
              {ApprovalStatus.Declined === details.status && (
                <Field label="⚠️ Reason for Decline" value={source.updates} />
              )}
              <AddressOfOrigin readonly={!isEdit} />
              <AddressOfDestination readonly={!isEdit} />
            </Grid>
          </Grid>
        </Box>

        {allowEdit && <Footer>
          {isEdit ? (
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.save}
              disabled={isSaving}>
              Save
            </Button>
          ) : (
              <Link className={classes.edit} onClick={handleEdit}>
                Edit
              </Link>
            )
          }
        </Footer>}
      </form>
    </Box>
  );
};

PassDetails.defaultProps = {
  details: {},
  isLoading: false,
  isEdit: false
};

PassDetails.propTypes = {
  details: PropTypes.shape(AccessPass),
  isLoading: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  handleEdits: PropTypes.func,
};
