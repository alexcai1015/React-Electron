import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ApprovalStatus, Roles } from '../../../../common/constants';
import { RoleBasedComponent } from '../../../../common/components/RoleBasedComponent';

import { AccessPassTableStatus } from './AccessPassTableStatus';

const useStyles = makeStyles((theme) => ({
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
  view: {
    color: theme.palette.linkBlue,
    textDecoration: 'underline',
    fontSize: 16,
  },
}));

export const ListRowActions = (props) => {
  const {
    onViewDetailsClick,
    status,
    loading,
    onApproveClick,
    onDenyClick,
    onSuspendClick,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AccessPassTableStatus
        status={status}
        loading={loading}
        onApproveClick={onApproveClick}
        onDenyClick={onDenyClick}
        onSuspendClick={onSuspendClick}
      />
      <RoleBasedComponent role={Roles.HAS_VIEW_DETAILS_ACCESS}>
        <Button className={classes.view} onClick={(event) => onViewDetailsClick(event)}>
          View Details
        </Button>
      </RoleBasedComponent>
    </div>
  );
};

ListRowActions.defaultProps = {
  type: ApprovalStatus.Pending,
};

ListRowActions.propTypes = {
  status: PropTypes.oneOf(Object.values(ApprovalStatus)),
  isLoading: PropTypes.bool,
  approvedStatusColor: PropTypes.string,
  deniedStatusColor: PropTypes.string,
  hiddenActions: PropTypes.bool,
  disabledActions: PropTypes.bool,
  onApproveClick: PropTypes.func.isRequired,
  onDenyClick: PropTypes.func.isRequired,
  onSuspendClick: PropTypes.func.isRequired,
  onViewDetailsClick: PropTypes.func.isRequired,
};

export default ListRowActions;
