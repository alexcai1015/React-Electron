import React from 'react';
import PropTypes from 'prop-types';

import APROVED from '../../assets/application_approved.svg';
import PENDING from '../../assets/application_pending.svg';
import DENIED from '../../assets/application_denied.svg';
import SUSPENDED from '../../assets/application_suspended.svg';
import EXPIRED from '../../assets/application_expired.svg';

const ApplicationStatusIcon = ({ status }) => {
  let imgSrc = null;

  switch (status.toUpperCase()) {
    case 'APPROVED':
      imgSrc = APROVED;
      break;
    case 'PENDING':
      imgSrc = PENDING;
      break;
    case 'DENIED':
    case 'DECLINED':
      imgSrc = DENIED;
      break;
    case 'SUSPENDED':
      imgSrc = SUSPENDED;
      break;
    case 'EXPIRED':
      imgSrc = EXPIRED;
      break;
    default:
      return null;
  }

  return <img src={imgSrc} width="317" height="252" alt="APROVED" title="APROVED" />;
};

ApplicationStatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ApplicationStatusIcon;
