import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';

import { ApprovalStatus } from '../../../../common/constants';

import { AccessPassTableStatusWrapper } from './accessPassTableStatus/AccessPassTableStatusWrapper';

const renderAccessPassOptions = (status, onApproveClick, onDenyClick, onSuspendClick, loading) => {
  switch (status) {
    case ApprovalStatus.Pending:
      return (
        <>
          <ApproveButton variant="contained" onClick={onApproveClick} disabled={loading}>
            Approve
          </ApproveButton>
          <DenyButton variant="contained" onClick={() => onDenyClick()} disabled={loading}>
            Deny
          </DenyButton>
        </>
      );
    case ApprovalStatus.Approved:
      return (
        <>
          <CheckCircleIcon color="inherit" />
          <Typography variant="body1">{status}</Typography>
          {/* <SuspendButton variant="contained" onClick={onSuspendClick} disabled={loading}>
            Revoke
          </SuspendButton> */}
        </>
      );
    case ApprovalStatus.Declined:
      return (
        <>
          <CancelIcon color="inherit" />
          <Typography variant="body1">{status}</Typography>
        </>
      );
    case ApprovalStatus.Suspended:
      return (
        <>
          <CancelIcon color="inherit" />
          <Typography variant="body1">{status}</Typography>
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

// eslint-disable-next-line no-shadow
const ApproveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.approvalGreen,
  '&:hover': {
    backgroundColor: theme.palette.approvalGreen,
  },
}));

// eslint-disable-next-line no-shadow
const DenyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.denialRed,
  '&:hover': {
    backgroundColor: theme.palette.denialRed,
  },
}));
