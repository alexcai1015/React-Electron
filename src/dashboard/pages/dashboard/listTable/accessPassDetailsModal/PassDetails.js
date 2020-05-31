import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import {
  ApprovalStatus,
  ApprovalStatusLabel,
  PassTypeLabel,
} from '../../../../../common/constants';
import { AccessPass } from '../../../../../common/constants/AccessPass';
import { useUpdateAccessPass } from '../../../../../common/hooks/useUpdateAccessPass';
import { useConfirmModal } from '../../../../../hooks/useConfirmModal';

import Header from './Header';
import Field from './Field';
import SectionTitle from './SectionTitle';
import AporType from './AporType';
import Footer from './Footer';

const validationSchema = Yup.object().shape({
  referenceId: Yup.string()
    .required('Contact Number is required')
    .matches(/^09[0-9]{9}$/, 'Phone number is not valid'),
});

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 725,
    maxHeight: '85vh',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '16px 64px 20px',
    maxHeight: 620,
    overflowY: 'scroll',
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
    fontWeight: 400,
    cursor: 'pointer',
  },
  save: {
    textDecoration: 'none',
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 400,
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

export const PassDetails = ({ handleClose, details, isLoading, allowEdit }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  // const { keycloak } = useKeycloak();
  // const allowEdit = keycloak.hasRealmRole(KeycloakRoles.HAS_EDIT_RECORD_ACCESS);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleSaveButtonClick = () => {
    setIsConfirmModalOpen(true);
  };

  const { execute, isLoading: isSaving, error, isSuccess, reset } = useUpdateAccessPass();
  const { submitForm, handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik(
    {
      initialValues: {
        ...details,
      },
      onSubmit: async ({
        name,
        email,
        company,
        id,
        idType,
        originName,
        originStreet,
        originCity,
        originProvince,
        destName,
        destStreet,
        destCity,
        destProvince,
        aporType,
        referenceId: newReferenceId,
      }) => {
        const { referenceId, key } = details;

        await execute(referenceId, {
          key,
          name,
          email,
          company,
          id,
          idType,
          originName,
          originStreet,
          originCity,
          originProvince,
          destName,
          destStreet,
          destCity,
          destProvince,
          aporType,
          referenceId: newReferenceId,
        });
      },

      validationSchema,
    }
  );

  const { modal } = useConfirmModal({
    open: isConfirmModalOpen,
    onCancel: () => setIsConfirmModalOpen(false),
    onClose: () => setIsConfirmModalOpen(false),
    onConfirm: submitForm,
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleClose();
    }
  }, [isSuccess, reset, handleClose]);

  const source = isEdit ? values : details;
  const [leftCol, rightCol] = isEdit ? [6, 6] : [4, 8];

  return (
    <>
      <Box className={classes.container}>
        <Header
          handleClose={handleClose}
          text={`Application ${ApprovalStatusLabel[details.status.toLowerCase()]}`}
          validUntil={
            details.status === 'approved'
              ? `Valid Until: ${moment(details.validUntil).format('MMMM D, YYYY')}`
              : null
          }
          subText={`Issued By: ${details.issuedBy ? details.issuedBy : 'N/A'}`}
        />
        <form onSubmit={handleSubmit}>
          <Box className={classes.content}>
            <AporType aporType={source.aporType} readonly={!isEdit} handleChange={handleChange} />
            <Grid item xs={12} container>
              <Grid item xs={leftCol}>
                <Field label="Control Code" value={source.controlCode} isLoading={isLoading} />
              </Grid>
              <Grid item xs={rightCol}>
                <Field
                  label="Notified"
                  value={source.notified ? `✅ Yes` : `🚫 No`}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>

            <SectionTitle title="Personal Details" />
            <Grid item xs={12} container>
              <Grid item xs={leftCol}>
                <Field
                  label="Name"
                  readonly={!isEdit}
                  handleChange={handleChange}
                  name="name"
                  value={source.name}
                />
                <Field
                  label="Email"
                  readonly={!isEdit}
                  handleChange={handleChange}
                  name="email"
                  value={source.email}
                />
                <Field
                  label={getReferenceIdLabel(details)}
                  readonly={!isEdit}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  name="referenceId"
                  value={source.referenceId}
                  error={
                    (touched.referenceId && errors.referenceId) || (error && error.response.data)
                  }
                  helperText={
                    (error && error.response.data && error.response.data.message) ||
                    (touched.referenceId && errors.referenceId)
                  }
                />
                <Field
                  label="Id type"
                  readonly={!isEdit}
                  handleChange={handleChange}
                  name="idType"
                  value={source.idType}
                />
                <Field
                  label="Id number"
                  readonly={!isEdit}
                  handleChange={handleChange}
                  name="id"
                  value={source.id}
                />
                <Field
                  label="Company/Institution"
                  readonly={!isEdit}
                  handleChange={handleChange}
                  name="company"
                  value={source.company}
                />
              </Grid>
              <Grid item xs={rightCol}>
                <Field label="Remarks" value={source.remarks} />
                {ApprovalStatus.Declined === details.status && (
                  <Field label="⚠️ Reason for Decline" value={source.updates} />
                )}
                <AddressOrigin readonly={!isEdit} handleChange={handleChange} source={source} />
                <AddressDestination
                  readonly={!isEdit}
                  handleChange={handleChange}
                  source={source}
                />
              </Grid>
            </Grid>
          </Box>

          {allowEdit && (
            <Footer>
              {isEdit ? (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.save}
                  disabled={isSaving}
                  onClick={handleSaveButtonClick}
                >
                  Save
                </Button>
              ) : (
                <Button component={Link} className={classes.edit} onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </Footer>
          )}
        </form>
      </Box>
      {modal}
    </>
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
  allowEdit: PropTypes.bool,
};

const AddressOrigin = ({ readonly, handleChange, source }) =>
  readonly ? (
    <Field
      label="Address of origin"
      value={formatAddress({
        name: source.originName,
        street: source.originStreet,
        city: source.originCity,
        province: source.originProvince,
      })}
    />
  ) : (
    <>
      <SectionTitle title="Origin" />
      <Field
        label="Name"
        readonly={readonly}
        handleChange={handleChange}
        name="originName"
        value={source.originName}
      />
      <Field
        label="Street"
        readonly={readonly}
        handleChange={handleChange}
        name="originStreet"
        value={source.originStreet}
      />
      <Field
        label="City"
        readonly={readonly}
        handleChange={handleChange}
        name="originCity"
        value={source.originCity}
      />
      <Field
        label="Province"
        readonly={readonly}
        handleChange={handleChange}
        name="originProvince"
        value={source.originProvince}
      />
    </>
  );

const AddressDestination = ({ readonly, handleChange, source }) =>
  readonly ? (
    <Field
      label="Address of Destination"
      value={formatAddress({
        name: source.destName,
        street: source.destStreet,
        city: source.destCity,
        province: source.destProvince,
      })}
    />
  ) : (
    <>
      <SectionTitle title="Destination" />
      <Field
        label="Name"
        readonly={readonly}
        handleChange={handleChange}
        name="destName"
        value={source.destName}
      />
      <Field
        label="Street"
        readonly={readonly}
        handleChange={handleChange}
        name="destStreet"
        value={source.destStreet}
      />
      <Field
        label="City"
        readonly={readonly}
        handleChange={handleChange}
        name="destCity"
        value={source.destCity}
      />
      <Field
        label="Province"
        readonly={readonly}
        handleChange={handleChange}
        name="destProvince"
        value={source.destProvince}
      />
    </>
  );

const AddressProps = {
  source: PropTypes.shape(AccessPass),
  handleChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
};
AddressOrigin.propTypes = AddressProps;
AddressDestination.propTypes = AddressProps;
