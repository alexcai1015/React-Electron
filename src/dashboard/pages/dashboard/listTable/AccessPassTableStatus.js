import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';

// import { theme } from '../../../../theme';
import { RoleToggle } from '../../../../common/components/RoleBasedComponent';
import { ApprovalStatus, KeycloakRoles, ApprovalStatusLabel } from '../../../../common/constants';

import { AccessPassTableStatusWrapper } from './accessPassTableStatus/AccessPassTableStatusWrapper';

const StatusDisplay = (status) => {
  return (
    <>
      <Typography variant="body1">{status.toUpperCase()}</Typography>
    </>
  );
};

const renderAccessPassOptions = (status, onApproveClick, onDenyClick, onSuspendClick, loading) => {
  switch (status) {
    case ApprovalStatus.Pending:
      return (
        <>
          <RoleToggle role={KeycloakRoles.HAS_APPROVE_ACCESS} deniedContent={StatusDisplay(status)}>
            <ApproveButton variant="contained" onClick={onApproveClick} disabled={loading}>
              Approve
            </ApproveButton>
            <DenyButton variant="contained" onClick={() => onDenyClick()} disabled={loading}>
              Deny
            </DenyButton>
          </RoleToggle>
        </>
      );
    case ApprovalStatus.Approved:
      return (
        <>
          <RoleToggle role={KeycloakRoles.HAS_VIEW_RECORD_STATUS}>
            <CheckCircleIcon color="inherit" />
            <Typography variant="body1">{status}</Typography>
            {/* // TODO: Suspend feature rollout
            <SuspendButton variant="contained" onClick={onSuspendClick} disabled={loading}>
              Revoke
            </SuspendButton> */}
          </RoleToggle>
        </>
      );
    case ApprovalStatus.Declined:
      return (
        <>
          <RoleToggle role={KeycloakRoles.HAS_VIEW_RECORD_STATUS}>
            <CancelIcon color="inherit" />
            <Typography variant="body1">{ApprovalStatusLabel[status]}</Typography>
          </RoleToggle>
        </>
      );
    case ApprovalStatus.Suspended:
      return (
        <>
          <RoleToggle role={KeycloakRoles.HAS_VIEW_RECORD_STATUS}>
            <CancelIcon color="inherit" />
            <Typography variant="body1">{ApprovalStatusLabel[status]}</Typography>
          </RoleToggle>
        </>
      );
    default:
      return null;
  }
};

export const AccessPassTableStatus = ({
  status,
  onApproveClick,
  onDenyClick,
  onSuspendClick,
  loading,
}) => {
  return (
    <AccessPassTableStatusWrapper status={status}>
      {renderAccessPassOptions(status, onApproveClick, onDenyClick, onSuspendClick, loading)}
    </AccessPassTableStatusWrapper>
  );
};

AccessPassTableStatus.propTypes = {
  status: PropTypes.string.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  onDenyClick: PropTypes.func.isRequired,
  onSuspendClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

AccessPassTableStatus.defaultProps = {
  loading: false,
};

const ApproveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.approvalGreen,
  '&:hover': {
    backgroundColor: theme.palette.approvalGreen,
  },
}));

const DenyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.denialRed,
  '&:hover': {
    backgroundColor: theme.palette.denialRed,
  },
}));

// TODO: Suspend feature rollout
// const SuspendButton = styled(Button)({
//   backgroundColor: theme.palette.suspendOrange,
//   '&:hover': {
//     backgroundColor: theme.palette.suspendOrange,
//   },
// });
