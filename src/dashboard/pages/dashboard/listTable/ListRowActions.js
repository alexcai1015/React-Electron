import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, withStyles } from '@material-ui/core';
import { Colors } from '../../../../common/constants/Colors';

// TODO match to APOR Type later
export const APPROVAL_STATUS = {
  Pending: 'pending',
  Approved: 'approved',
  Denied: 'denied',
  Cancelled: 'cancelled',
};

const allStyles = {
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
};

const ActionsHOC = (props) => {
  return {
    [APPROVAL_STATUS.Pending]: (
      <div className={props.classes.actions}>
        <Button
          variant="contained"
          className={props.classes.approve}
          disabled={props.isLoading}
          onClick={(event) => props.onApproveClick(event)}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          className={props.classes.deny}
          disabled={props.isLoading}
          onClick={(event) => props.onDenyClick(event)}
        >
          Deny
        </Button>
      </div>
    ),
    [APPROVAL_STATUS.Approved]: (
      <div className={props.classes.labels}>
        <Typography variant="body1" className={props.approvedLabel}>
          Approved
        </Typography>
      </div>
    ),
    [APPROVAL_STATUS.Denied]: (
      <div className={props.classes.labels}>
        <Typography variant="body1" className={props.deniedLabel}>
          Denied
        </Typography>
      </div>
    ),
    [APPROVAL_STATUS.Cancelled]: (
      <div className={props.classes.labels}>
        <Typography variant="body1" className={props.cancelledLabel}>
          Cancelled
        </Typography>
      </div>
    ),
  }[props.status];
};

export const ListRowActions = withStyles(allStyles)((props) => {
  const { classes, onViewDetailsClick, status } = props;
  return (
    <div className={classes.container}>
      <ActionsHOC {...props} />
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
