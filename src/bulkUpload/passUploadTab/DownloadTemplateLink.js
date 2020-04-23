import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import { PassType, PassTypeLabel } from '../../common/constants/PassType';

// const GITLAB_PUBLIC_URL = `https://gitlab.com/dctx/rapidpass/rapidpass-dashboard/-/tree/master/public`;
const useStyles = makeStyles({
  linkText: {
    paddingLeft: 5,
  },
});

export const DownloadTemplateLink = ({ sourceURL = '', type = '' }) => {
  const classes = useStyles();
  return (
    <Typography>
      Download
      {type && PassTypeLabel[type] ? ` ${PassTypeLabel[type].templateLabel}` : ' template'}
      <a
        href={type && `${sourceURL}/templates/Bulk_Upload_Template_${type.toUpperCase()}.xlsx`}
        download
        className={classes.linkText}
        target="_blank"
        rel="noopener noreferrer"
      >
        here
      </a>
      &nbsp;and attestation-form&nbsp;
      <a href={sourceURL + '/templates/RapidPass_Attestation_Form.pdf'} target="_blank" rel="noopener noreferrer">
        here
      </a>.
    </Typography>
  );
};

DownloadTemplateLink.propTypes = {
  sourceURL: PropTypes.string,
  type: PropTypes.oneOf(Object.values(PassType)),
};
