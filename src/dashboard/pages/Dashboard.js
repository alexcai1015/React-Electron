import React, { useState } from 'react';
import { Box, Container, Grid, MenuItem, TextField, styled } from '@material-ui/core';

import { NavigationBar } from '../../common/components/NavigationBar';
import { GoogleAnalytics } from '../../common/components/GoogleAnalytics';

import { ListTable } from './dashboard/ListTable';

const StatusFilterOption = {
  ShowAll: {
    value: 'show_all',
    label: 'Show All',
  },
  Pending: {
    value: 'pending',
    label: 'Pending',
  },
  Approved: {
    value: 'approved',
    label: 'Approved',
  },
  Denied: {
    value: 'denied',
    label: 'Denied',
  },
};

const StatusFilterOptions = [
  StatusFilterOption.ShowAll,
  StatusFilterOption.Pending,
  StatusFilterOption.Approved,
  StatusFilterOption.Denied,
];

export const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    StatusFilterOption.ShowAll.value
  );

  const handleFilterSelectChange = (event) => {
    setSelectedFilterOption(event.target.value);
  };

  // ? TODO - Remove later once search thru API is ready
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box>
      <NavigationBar />
      <Box component="main">
        <StyledFiltersBlock>
          <Container>
            <Grid container>
              <Grid item lg={8} md={6} sm={12} xs={12}>
                <StyledSearchTextField
                  label="Search"
                  type="search"
                  onChange={handleSearchChange}
                  variant="outlined"
                />
              </Grid>
              <Grid container justify="flex-end" item lg={4} md={6} sm={12} xs={12}>
                <StyledFilterSelectTextField
                  select
                  label="Filter by status:"
                  value={selectedFilterOption}
                  onChange={handleFilterSelectChange}
                  variant="outlined"
                >
                  {StatusFilterOptions.map(({ label, value }) => (
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
            <ListTable searchValue={searchValue} />
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

const StyledSearchTextField = styled(TextField)({
  width: 456,
});
