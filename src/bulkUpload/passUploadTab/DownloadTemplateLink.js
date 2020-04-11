import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';
const GITLAB_PUBLIC_URL = `https://gitlab.com/dctx/rapidpass/rapidpass-dashboard/-/tree/master/public`;
const useStyles = makeStyles({
  linkText: {
    paddingLeft: 5,
  },
});

export const DownloadTemplateLink = ({ sourceURL = GITLAB_PUBLIC_URL }) => {
  const classes = useStyles();
  return (
    <Typography>
      Download the template
      <Link href={`${sourceURL}/templates/bulk-upload-template.csv`} download className={classes.linkText}>
        here.
      </Link>
    </Typography>
  );
};
