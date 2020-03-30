import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, withStyles } from '@material-ui/core';
import { Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';

import { Colors } from '../../../../common/constants/Colors';

export const APPROVAL_STATUS = {
  Pending: 'pending',
  Approved: 'approved',
  Declined: 'declined',

  // Cancelled: 'cancelled',
};

const allStyles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    '& .MuiButtonBase-root': {
      textTransform: 'capitalize',
      borderRadius: 20,
      fontWeight: 600,
      fontFamily: 'Work Sans, sans-serif',
      margin: 4,
    },
  },
  actions: {
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
  labels: {
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
    '& .MuiSvgIcon-root': {
      marginRight: 4,
      fontSize: 20,
    },
    '& .MuiTypography-root': {
      marginRight: 'auto',
    },
  },
  approvedLabel: {
    color: Colors.ApprovalGreen,
  },
  deniedLabel: {
    color: Colors.DenialDarkRed,
  },
  cancelledLabel: {
    color: Colors.CancelGray,
  },
};

const ActionsHOC = (props) => {
  const { classes } = props;
  return (
    {
      [APPROVAL_STATUS.Pending]: (
        <div className={classes.actions}>
          <Button
            variant="contained"
            className={classes.approve}
            disabled={props.isLoading}
            onClick={(event) => props.onApproveClick(event)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            className={classes.deny}
            disabled={props.isLoading}
            onClick={(event) => props.onDenyClick(event)}
          >
            Deny
          </Button>
        </div>
      ),
      [APPROVAL_STATUS.Approved]: (
        <div className={`${classes.labels} ${classes.approvedLabel}`}>
          <CheckCircleIcon color="inherit" />
          <Typography variant="body1">Approved</Typography>
        </div>
      ),
      [APPROVAL_STATUS.Declined]: (
        <div className={`${classes.labels} ${classes.deniedLabel}`}>
          <CancelIcon color="inherit" />
          <Typography variant="body1">Denied</Typography>
        </div>
      ),

      // [APPROVAL_STATUS.Cancelled]: (
      //   <div className={`${classes.labels} ${classes.cancelledLabel}`}>
      //     <InfoIcon color="inherit" />
      //     <Typography variant="body1">
      //       Cancelled
      //     </Typography>
      //   </div>
      // ),
    }[props.status] || null
  ); // only View Detail will remain
};

export const ListRowActions = withStyles(allStyles)((props) => {
  const { classes, onViewDetailsClick } = props;
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
