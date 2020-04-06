import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  linkText: {
    paddingLeft: 5,
  },
});

export const DownloadTemplateLink = () => {
  const classes = useStyles();
  return (
    <Typography>
      Download the template
      <Link href="/templates/bulk-upload-template.csv" download className={classes.linkText}>
        here.
      </Link>
    </Typography>
  );
};
