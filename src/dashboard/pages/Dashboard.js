import React, { useState } from 'react';
import { Box, Container, Grid, TextField, MenuItem, styled } from '@material-ui/core';

import { NavigationBar } from '../../common/components/NavigationBar';

import { ListTable } from './dashboard/ListTable';

const filterOptions = [
  {
    value: 'show_all',
    label: 'Show All',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'approved',
    label: 'Approved',
  },
  {
    value: 'denied',
    label: 'Denied',
  },
];

export const Dashboard = () => {
  const [selectedFilterOption, setSelectedFilterOption] = useState('show_all');

  const handleFilterSelectChange = (event) => {
    setSelectedFilterOption(event.target.value);
  };

  return (
    <Box>
      <NavigationBar />
      <Box component="main">
        <StyledFiltersBlock>
          <Container>
            <Grid container>
              <Grid item lg={6}>
                <TextField label="Search" type="search" />
              </Grid>
              <Grid container justify="flex-end" item lg={6}>
                <StyledFilterSelectTextField
                  select
                  label="Filter by status:"
                  value={selectedFilterOption}
                  onChange={handleFilterSelectChange}
                  variant="outlined"
                >
                  {filterOptions.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </StyledFilterSelectTextField>
              </Grid>
            </Grid>
          </Container>
        </StyledFiltersBlock>

        <Box py={3}>
          <Container>
            <ListTable />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

const StyledFiltersBlock = styled(Box)(({ theme }) => ({
  // ! TODO: use color value from theme
  borderBottom: '1px solid #DDDDDD',
  paddingBottom: theme.spacing(3),
  paddingTop: theme.spacing(4),
}));

const StyledFilterSelectTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(5),
  width: 180,
}));
