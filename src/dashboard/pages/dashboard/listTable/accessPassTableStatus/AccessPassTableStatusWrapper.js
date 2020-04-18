import React from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { theme } from '../../../../../theme';
import { ApprovalStatus } from '../../../../../common/constants';

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
    case ApprovalStatus.Suspended:
      return <StatusSuspended>{children}</StatusSuspended>;
    default:
      return <StatusBase>{children}</StatusBase>;
  }
};

AccessPassTableStatusWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
};

const StatusBase = styled(Box)(({ theme }) => ({
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
  color: theme.palette.cancelGray,
  '& .MuiSvgIcon-root': {
    marginRight: 4,
    fontSize: 20,
  },
  '& .MuiTypography-root': {
    marginRight: 'auto',
  },
}));

const StatusBaseActions = styled(Box)({
  display: 'inline-flex',
  marginLeft: 'auto',
  alignItems: 'center',
  fontSize: 19,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 2,
  justifyContent: 'flex-end',
  '& .MuiButton-root': {
    width: 130,
    fontSize: 14,
    color: theme.palette.white,
    '&:hover': {
      opacity: 0.9,
      textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
    },
  },
});

const StatusApproved = styled(StatusBaseActions)({
  color: theme.palette.approvalGreen
});

const StatusDeclined = styled(StatusBaseActions)({
  color: theme.palette.denialDarkRed
});

const StatusExpired = styled(StatusBase)(({ theme }) => ({
  color: theme.palette.denialDarkRed,
}));

const StatusSuspended = styled(StatusBaseActions)({
  color: theme.palette.suspendOrange,
});

const StatusPending = styled(Box)({
  display: 'inline-flex',
  marginLeft: 'auto',
  '& .MuiButton-root': {
    width: 130,
    fontSize: 14,
    color: theme.palette.white,
    '&:hover': {
      opacity: 0.9,
      textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
    },
  },
});
