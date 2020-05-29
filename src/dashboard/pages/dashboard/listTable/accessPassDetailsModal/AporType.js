import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, TextField, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { styled, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import { getAporTypesDictionary } from '../../../../../store/slices';

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
  fieldContainer: {
    paddingBottom: 12,
    '& > *': {
      width: '95%',
    },
  },
}));

const AporType = ({ aporType, readonly, handleChange }) => {
  const AporTypeMap = useSelector(getAporTypesDictionary);
  const [newAporCode, setNewAporCode] = useState(aporType);
  const classes = useStyles();

  useEffect(() => {
    setNewAporCode(aporType);
  }, [aporType]);

  return (
    <Grid item xs={12} container>
      <Grid item xs={4}>
        <Box className={classes.aporTypeSection}>
          {readonly ? (
            <>
              <Typography className={classes.label}>Apor Type</Typography>
              <Typography className={classes.title}>{aporType}</Typography>
            </>
          ) : (
            <Box className={classes.fieldContainer}>
              <SelectFormField
                label="Apor Type"
                name="aporType"
                value={aporType}
                variant="filled"
                placeholder="APOR TYPE"
                type="select"
                select
                onChange={handleChange}
              >
                {R.map((aporCode) => (
                  <MenuItem key={aporCode} value={aporCode}>
                    {aporCode}
                  </MenuItem>
                ))(Object.keys(AporTypeMap))}
              </SelectFormField>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box className={classes.aporTypeSection}>
          <Typography className={classes.label}>Apor Type Description</Typography>
          <Typography className={classes.title}>
            {AporTypeMap[newAporCode] ? AporTypeMap[newAporCode].description : aporType}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const SelectFormField = styled(TextField)({});

AporType.defaultProps = {
  aporType: 'N/A',
};

AporType.propTypes = {
  aporType: PropTypes.string,
  readonly: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default AporType;
