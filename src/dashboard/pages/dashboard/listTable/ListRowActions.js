import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { Colors } from '../../../../common/constants/Colors';

// TODO match to APOR Type later
export const APPROVAL_STATUS = {
  Pending: 'pending',
  Approved: 'approved',
  Denied: 'denied',
  Cancelled: 'cancelled',
};

export const ListRowActions = withStyles({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& .MuiButtonBase-root': {
      textTransform: 'capitalize',
      borderRadius: 20,
      fontWeight: 600,
      fontFamily: 'Work Sans, sans-serif',
      margin: 4,
    },
  },
  actions: {
    display: 'inline-block',
    '& .MuiButton-root': {
      width: 157,
      fontSize: 14,
      color: Colors.White,
      '&:hover': {
        opacity: 0.9,
        textShadow: '0 -1px 1px #5f5f5f, 0 -1px 1px #fff',
      },
    },
  },
  approve: {
    backgroundColor: Colors.ApprovalGreen,
    '&:hover': {
      backgroundColor: Colors.ApprovalGreen,
    },
  },
  deny: {
    backgroundColor: Colors.DenialRed,
    '&:hover': {
      backgroundColor: Colors.DenialRed,
    },
  },
  view: {
    color: Colors.LinkBlue,
    textDecoration: 'underline',
    fontSize: 16,
  },
})((props) => {
  const { classes, isLoading, onApproveClick, onDenyClick, onViewDetailsClick, type } = props;
  return (
    <div className={classes.container}>
      {type === APPROVAL_STATUS.Pending ? (
        <div className={classes.actions}>
          <Button
            variant="contained"
            className={classes.approve}
            disabled={isLoading}
            onClick={(event) => onApproveClick(event)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            className={classes.deny}
            disabled={isLoading}
            onClick={(event) => onDenyClick(event)}
          >
            Deny
          </Button>
        </div>
      ) : (
        <div>Somethign else</div>
      )}

      <Button className={classes.view} onClick={(event) => onViewDetailsClick(event)}>
        View Details
      </Button>
    </div>
  );
});

ListRowActions.defaultProps = {
  type: APPROVAL_STATUS.Pending,
};

ListRowActions.propTypes = {
  status: PropTypes.oneOf(Object.values(APPROVAL_STATUS)),
  isLoading: PropTypes.bool,
  approvedStatusColor: PropTypes.string,
  deniedStatusColor: PropTypes.string,
  hiddenActions: PropTypes.bool,
  disabledActions: PropTypes.bool,
  onApproveClick: PropTypes.func.isRequired,
  onDenyClick: PropTypes.func.isRequired,
  onViewDetailsClick: PropTypes.func.isRequired,
};

export default ListRowActions;
