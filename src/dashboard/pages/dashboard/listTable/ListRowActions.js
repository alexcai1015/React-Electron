import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { Colors } from '../../../../common/constants/Colors';

export const ListRowActions = withStyles({
  container: {
    flex: 1,
    '& .MuiButtonBase-root': {
      textTransform: 'capitalize',
      borderRadius: 20,
      fontWeight: 600,
      fontFamily: 'Work Sans, sans-serif',
      margin: 4,
    },
    '& .MuiButton-contained': {
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
  const { classes, actionPending, onApproveClick, onDenyClick, onViewDetailsClick } = props;
  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        className={classes.approve}
        disabled={actionPending}
        onClick={(event) => onApproveClick(event)}
      >
        Approve
      </Button>
      <Button
        variant="contained"
        className={classes.deny}
        disabled={actionPending}
        onClick={(event) => onDenyClick(event)}
      >
        Deny
      </Button>
      <Button className={classes.view} onClick={(event) => onViewDetailsClick(event)}>
        View Details
      </Button>
    </div>
  );
});

ListRowActions.propTypes = {
  actionPending: PropTypes.bool,
  approvedStatusColor: PropTypes.string,
  deniedStatusColor: PropTypes.string,
  hiddenActions: PropTypes.bool,
  disabledActions: PropTypes.bool,
  onApproveClick: PropTypes.func.isRequired,
  onDenyClick: PropTypes.func.isRequired,
  onViewDetailsClick: PropTypes.func.isRequired,
};

export default ListRowActions;
