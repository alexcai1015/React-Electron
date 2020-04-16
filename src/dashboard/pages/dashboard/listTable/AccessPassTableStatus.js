import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';

import { ApprovalStatus } from '../../../../common/constants';

import { AccessPassTableStatusWrapper } from './accessPassTableStatus/AccessPassTableStatusWrapper';

export const AccessPassTableStatus = ({ status, onApproveClick, onDenyClick, loading }) => {
  return (
    <AccessPassTableStatusWrapper status={status}>
      {status === ApprovalStatus.Pending ? (
        <>
          <ApproveButton variant="contained" onClick={onApproveClick} disabled={loading}>
            Approve
          </ApproveButton>
          <DenyButton variant="contained" onClick={() => onDenyClick()} disabled={loading}>
            Deny
          </DenyButton>
        </>
      ) : (
        <>
          {status === ApprovalStatus.Approved ? (
            <CheckCircleIcon color="inherit" />
          ) : (
            <CancelIcon color="inherit" />
          )}
          <Typography variant="body1">{status}</Typography>
        </>
      )}
    </AccessPassTableStatusWrapper>
  );
};

AccessPassTableStatus.propTypes = {
  status: PropTypes.string.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  onDenyClick: PropTypes.func.isRequired,
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
