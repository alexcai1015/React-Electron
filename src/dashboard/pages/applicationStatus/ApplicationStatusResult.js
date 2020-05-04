import React from 'react';
import { Box, Container, Grid, styled, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import ApplicationStatusIcon from '../../../common/components/ApplicationStatusIcon';

export const ApplicationStatusResult = ({ status, controlNumber, updatesData }) => {
  const resultGenerator = () => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return (
          <>
            <Grid container justify="center">
              <ApplicationStatusIcon status={status} />
            </Grid>
          </>
        );
      case 'APPROVED':
        return (
          <>
            <Grid container justify="center">
              <ApplicationStatusIcon status={status} />
            </Grid>
            <Container>
              <ControlNumberWrapper>
                <Typography align="center" variant="h6">
                  Rapid Pass ID
                  <RapidPassIDStyled>{controlNumber}</RapidPassIDStyled>
                </Typography>
              </ControlNumberWrapper>
              <Typography align="justify" variant="body1">
                To download the RapidPass QR pdf, you may go to &nbsp;
                <a href={`https://rapidpass.ph/qr/${controlNumber}`}>
                  https://rapidpass.ph/qr/
                  {controlNumber}
                </a>
                .
                <br />
                <br />
                Control Number should STRICTLY be shared only to the requestor owner.
              </Typography>
            </Container>
          </>
        );
      case 'DENIED':
      case 'DECLINED':
        return (
          <>
            <Grid container justify="center">
              <ApplicationStatusIcon status={status} />
            </Grid>
            <Container>
              <ControlNumberWrapper>
                <Typography align="center" variant="h6">
                  Rapid Pass ID
                  <RapidPassIDStyled>{controlNumber}</RapidPassIDStyled>
                </Typography>
              </ControlNumberWrapper>
              <Typography align="center" variant="body1">
                {updatesData}
              </Typography>
            </Container>
          </>
        );
      case 'EXPIRED':
        return (
          <>
            <Grid container justify="center">
              <ApplicationStatusIcon status={status} />
            </Grid>
            <Container>
              <RapidPassIDWrapper>
                <Typography align="center" variant="h6">
                  Rapid Pass ID
                  <RapidPassIDStyled>{controlNumber}</RapidPassIDStyled>
                </Typography>
              </RapidPassIDWrapper>
            </Container>
          </>
        );
      case 'SUSPENDED':
        return (
          <>
            <Grid container justify="center">
              <ApplicationStatusIcon status={status} />
            </Grid>
            <Container>
              <RapidPassIDWrapper>
                <Typography align="center" variant="h6">
                  Rapid Pass ID
                  <RapidPassIDStyled>{controlNumber}</RapidPassIDStyled>
                </Typography>
              </RapidPassIDWrapper>
              <Typography align="center" variant="body1">
                {updatesData}
              </Typography>
            </Container>
          </>
        );
      default:
        return null;
    }
  };

  return <>{resultGenerator()}</>;
};

ApplicationStatusResult.propTypes = {
  status: PropTypes.string,
  controlNumber: PropTypes.string,
  updatesData: PropTypes.string,
};

const ControlNumberWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  border: `${theme.palette.mainPurple} solid 1px`,
}));

const RapidPassIDWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
}));

const RapidPassIDStyled = styled(Container)(({ theme }) => ({
  color: theme.palette.white,
  width: '100%',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: theme.palette.mainPurple,
}));
