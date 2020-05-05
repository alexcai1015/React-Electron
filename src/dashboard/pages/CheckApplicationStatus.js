import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  FormControl,
  TextField,
  styled,
  Typography,
  Button,
} from '@material-ui/core';
import { isEmpty } from 'ramda';

import { useCheckApplicationStatus } from '../../common/hooks';

import { ApplicationStatusResult } from './applicationStatus/ApplicationStatusResult';

export const CheckApplicationStatus = () => {
  const [searchValue, setSearchValue] = useState('');
  const {
    data: applicationStatusData,
    query,
    reset,
    error = null,
    isLoading,
  } = useCheckApplicationStatus();

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setSearchValue(searchQuery);
  };

  const handleCheckApplicationStatusClicked = () => {
    query({ referenceId: searchValue.trim() });
  };

  return (
    <Box>
      <Container>
        <Grid container direction="column" justify="center" alignItems="center">
          <StyledContainer>
            {isEmpty(applicationStatusData) && (
              <Grid container direction="column" justify="center" alignItems="center">
                <Typography align="justify">
                  Check the application status of the requestor’s RapidPass by typing the mobile
                  number below.
                </Typography>
                <FormControlWrapper fullWidth>
                  <Typography variant="subtitle1">
                    Contact Number (Input Format should be 09XXXXXXXXX)
                  </Typography>
                  <TextField size="small" variant="outlined" onChange={handleSearchChange} />
                  {error && error.response.data && (
                    <Typography variant="body1" gutterBottom color="error">
                      {error.response.data.message}
                    </Typography>
                  )}
                  <SubmitButton
                    fullWidth
                    type="button"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleCheckApplicationStatusClicked}
                    disabled={!searchValue.length || isLoading}
                  >
                    Check Status
                  </SubmitButton>
                </FormControlWrapper>
              </Grid>
            )}

            {!isEmpty(applicationStatusData) && (
              <>
                <ApplicationStatusResult
                  controlNumber={applicationStatusData.controlCode}
                  status={applicationStatusData.status}
                  updatesData={applicationStatusData.updates}
                />
                <Container>
                  <BackButton
                    fullWidth
                    type="button"
                    size="large"
                    variant="outlined"
                    onClick={reset}
                  >
                    Back
                  </BackButton>
                </Container>
              </>
            )}
          </StyledContainer>
        </Grid>
      </Container>
    </Box>
  );
};

const FormControlWrapper = styled(FormControl)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  width: 550,
  paddingTop: theme.spacing(17),
  paddingBottom: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 14,
  backgroundColor: theme.palette.success.main,
  '&:hover': {
    backgroundColor: theme.palette.success.main,
    boxShadow: 'none',
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 14,
  color: theme.palette.success.main,
}));
