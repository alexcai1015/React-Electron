import React from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { ApprovalStatus, Colors } from '../../../../../common/constants';

export const AccessPassTableStatusWrapper = ({ status, children }) => {
  switch (status) {
    case ApprovalStatus.Pending:
      return <StatusPending>{children}</StatusPending>;
    case ApprovalStatus.Approved:
      return <StatusApproved>{children}</StatusApproved>;
    case ApprovalStatus.Declined:
      return <StatusDeclined>{children}</StatusDeclined>;
    case ApprovalStatus.Expired:
      return <StatusExpired>{children}</StatusExpired>;
    default:
      return <StatusBase>{children}</StatusBase>;
  }
};

AccessPassTableStatusWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

const StatusBase = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: 130,
  fontSize: 19,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 2,
  marginLeft: 130,
  color: Colors.CancelGray,
  '& .MuiSvgIcon-root': {
    marginRight: 4,
    fontSize: 20,
  },
  '& .MuiTypography-root': {
    marginRight: 'auto',
  },
});

const StatusApproved = styled(StatusBase)({
  color: Colors.ApprovalGreen,
});

const StatusDeclined = styled(StatusBase)({
  color: Colors.DenialDarkRed,
});

const StatusExpired = styled(StatusBase)({
  color: Colors.DenialDarkRed,
});

const StatusPending = styled(Box)({
  display: 'inline-flex',
  marginLeft: 'auto',
  '& .MuiButton-root': {
    width: 130,
    fontSize: 14,
    color: Colors.White,
    '&:hover': {
      opacity: 0.9,
      textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
    },
  },
});
