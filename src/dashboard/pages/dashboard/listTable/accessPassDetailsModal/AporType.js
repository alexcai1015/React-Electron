import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { AporType as AporTypeMap } from '../../../../../common/constants';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.labelGray,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  aporTypeSection: {
    marginBottom: 20,
  },
}));

const AporType = ({ aporType }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container>
      <Grid item xs={4}>
        <Box className={classes.aporTypeSection}>
          <Typography className={classes.label}>Apor Type</Typography>
          <Typography className={classes.title}>{aporType}</Typography>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box className={classes.aporTypeSection}>
          <Typography className={classes.label}>Apor Type Description</Typography>
          <Typography className={classes.title}>
            {AporTypeMap[aporType] ? AporTypeMap[aporType].value : aporType}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

AporType.defaultProps = {
  aporType: 'N/A',
};

AporType.propTypes = {
  aporType: PropTypes.string,
};

export default AporType;
