import React, { useEffect, useState } from 'react';
import { Grid, styled, TextField, Button } from '@material-ui/core';
import { AddBox, Check, Clear } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useKeycloak } from '@react-keycloak/web';

import { useToggle, useCreateAporType } from '../../common/hooks/';
import { useSnackbar } from '../../hooks';
import { KeycloakRoles } from '../../common/constants';

const validationSchema = Yup.object().shape({
  aporCode: Yup.string().required('Required', 'APOR Code is required')
  .min(2, 'APOR Code should be minimum of two(2) characters')
  .max(3, 'APOR Code should be maximum of three(3) characters')
  .matches(/^[A-Za-z]{2,3}$/, 'APOR CODE should only be a letters A-Z'),
  description: Yup.string()
    .required('Required', 'Description is required')
    .min(2, 'Description should be minimum of two(2) characters'),
  approvingAgency: Yup.string()
    .required('Required', 'Approving Agency  is required')
    .min(2, 'Approving Agency should be minimum of two(2) characters'),
});

export function AddAporForm({ aporList }) {
  const {
    execute: createAporType,
    createAporStatusResponse,
    resetCreateAporStatusResponse,
  } = useCreateAporType();
  const { on: showAddApoForm, toggle: toggleAddAporForm } = useToggle();
  const { showSnackbar } = useSnackbar();
  const { keycloak } = useKeycloak();

  const [aporCodeExists, setAporCodeExists] = useState(false);

  const { handleSubmit, handleChange, values, errors, touched, handleBlur, resetForm } = useFormik({
    initialValues: {
      aporCode: '',
      description: '',
      approvingAgency: '',
    },
    onSubmit: async ({ aporCode, description, approvingAgency }) => {
      if (!aporCodeExists) {
        await createAporType({ aporCode, description, approvingAgency });
      }
    },
    validationSchema,
  });

  useEffect(() => {
    if (values.aporCode) {
      setAporCodeExists(aporList.some(({ aporCode }) => aporCode === values.aporCode));
    } else {
      setAporCodeExists(false);
    }
  }, [values.aporCode, aporCodeExists, aporList]);

  useEffect(() => {
    if (createAporStatusResponse && createAporStatusResponse === 200) {
      resetForm();
      resetCreateAporStatusResponse();
      showSnackbar({ message: 'APOR was successfully added', severity: 'success' });
    } else if (createAporStatusResponse && createAporStatusResponse > 400) {
      showSnackbar({ message: 'Something went wrong!', severity: 'error' });
    }
  }, [createAporStatusResponse, resetCreateAporStatusResponse, resetForm, showSnackbar]);

  const handleCancelButtonClicked = () => {
    resetForm();
    toggleAddAporForm();
  }

  const allowAddition = keycloak.hasRealmRole(KeycloakRoles.HAS_ADD_APOR_TYPE_ACCESS);
  if (!allowAddition) return <></>
  return (
    <StyledAddAporGrid container direction="row" justify="flex-end" alignItems="flex-start">
      <Grid>
        {showAddApoForm && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item>
                <TextField
                  name="aporCode"
                  size="small"
                  label="APOR Code"
                  variant="outlined"
                  value={values.aporCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={
                    aporCodeExists
                      ? 'APOR Code already exists in the list.'
                      : touched.aporCode && errors.aporCode && errors.aporCode
                  }
                  error={(touched.aporCode && errors.aporCode) || aporCodeExists ? true : false}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="description"
                  size="small"
                  label="Industry"
                  variant="outlined"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.description && errors.description && errors.description}
                  error={touched.description && errors.description ? true : false}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="approvingAgency"
                  size="small"
                  label="Approving Agency"
                  variant="outlined"
                  value={values.approvingAgency}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={
                    touched.approvingAgency && errors.approvingAgency && errors.approvingAgency
                  }
                  error={touched.approvingAgency && errors.approvingAgency ? true : false}
                />
              </Grid>
              <Grid item>
                <Button type="submit" color="primary">
                  <Check />
                </Button>
                <Button onClick={handleCancelButtonClicked}>
                  <Clear />
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>
      <Grid>
        {!showAddApoForm && (
          <StyledAddButton onClick={toggleAddAporForm}>
            <AddBox />
          </StyledAddButton>
        )}
      </Grid>
    </StyledAddAporGrid>
  );
}

const StyledAddAporGrid = styled(Grid)(() => ({
  marginBottom: '10px',
}));
const StyledAddButton = styled(Button)(() => ({
  marginBottom: '4px',
}));

