import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import { PassType } from '../../common/constants/PassType';

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
      Download the template
      <a
        href={type && `${sourceURL}/templates/Bulk_Upload_Template_${type.toUpperCase()}.xlsx`}
        download
        className={classes.linkText}
        target="_blank"
        rel="noopener noreferrer"
      >
        here.
      </a>
    </Typography>
  );
};

DownloadTemplateLink.propTypes = {
  sourceURL: PropTypes.string,
  type: PropTypes.oneOf(Object.values(PassType)),
};
