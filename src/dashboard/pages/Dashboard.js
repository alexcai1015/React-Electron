import React, { useCallback, useState, useEffect } from 'react';
import { Box, Container, Grid, MenuItem, TextField, styled } from '@material-ui/core';

import { NavigationBar } from '../../common/components/NavigationBar';
import { useGetAccessPasses, useToggle, useDenyAccessPass } from '../../common/hooks';
import { ApprovalStatus, Source } from '../../common/constants';
import { useApproveAccessPass } from '../../common/hooks/useApproveAccessPass';
import { useQueryString } from '../../hooks';

import { ListTable } from './dashboard/ListTable';
import { AccessPassDenyModal } from './dashboard/listTable/AccessPassDenyModal';
import { AccessPassDetailsModal } from './dashboard/listTable/AccessPassDetailsModal';

/** use this to init any new queryparams */
const DefaultQueryParams = Object.freeze({
  source: Source.Online
});

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
  const [selectedAcessPass, setSelectedAccesPass] = useState(undefined);
  const { on: isDenyAcessPassModalDisplayed, toggle: toggleDenyAccessPassModal } = useToggle();
  const { on: isAccessPassDetailModalDisplayed, toggle: toggleAccessPassDetailModal } = useToggle();
  const {
    data: { list: accessPasses, totalPages, totalRows },
    isLoading: isGetAccessPassesLoading,
    query: getAccessPassesQuery,
  } = useGetAccessPasses();

  const { setQueryString } = useQueryString();

  const {
    execute: executeApproveAccessPass,
    isLoading: isApproveAccessPassLoading,
  } = useApproveAccessPass(selectedAcessPass);

  const {
    execute: executeDenyAccessPass,
    isSuccess: isSuccessDenyAccessPass,
    isLoading: isDenyAccessPassLoading,
  } = useDenyAccessPass(selectedAcessPass);

  useEffect(() => {
    if (isSuccessDenyAccessPass) {
      toggleDenyAccessPassModal();
    }
  }, [isSuccessDenyAccessPass, toggleDenyAccessPassModal]);

  const handleFilterSelectChange = (event) => {
    const nextFilterValue = event.target.value;

    setSelectedFilterOption(nextFilterValue);

    setQueryString({
      queryString: {
        filter: nextFilterValue,
      },
    });
  };

  // ? TODO - Remove later once search thru API is ready
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleViewDetailsClicked = (accessPass) => {
    setSelectedAccesPass(accessPass);
    toggleAccessPassDetailModal();
  };

  const handleApproveAccessPassClicked = (accessPass) => {
    const { referenceId } = accessPass;
    setSelectedAccesPass(accessPass);

    executeApproveAccessPass(referenceId, {
      status: ApprovalStatus.Approved.toUpperCase(),
    });
  };

  const handleDenyAccessPassClicked = (accessPass) => {
    setSelectedAccesPass(accessPass);
    toggleDenyAccessPassModal();
  };

  const handleDenyAccessPass = ({ referenceId, remarks } = {}) => {
    executeDenyAccessPass(referenceId, {
      status: ApprovalStatus.Declined.toUpperCase(),
      remarks,
    });
  };

  const fetchData = useCallback(
    ({ pageIndex, pageSize }) => {
      getAccessPassesQuery({
        urlQueryParams: {
          ...DefaultQueryParams,
          pageNo: pageIndex,
          maxPageRows: pageSize,
        },
      });
    },
    [getAccessPassesQuery]
  );

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
            <ListTable
              data={accessPasses}
              fetchData={fetchData}
              loading={isGetAccessPassesLoading}
              pageCount={totalPages}
              searchValue={searchValue}
              disabledActions={isDenyAccessPassLoading || isApproveAccessPassLoading}
              rowCount={totalRows}
              onApproveClick={handleApproveAccessPassClicked}
              onDenyClick={handleDenyAccessPassClicked}
              onViewDetailsClick={handleViewDetailsClicked}
            />

            {/* AVOID MOUNTING */}
            {isDenyAcessPassModalDisplayed && (
              <AccessPassDenyModal
                isOpen={isDenyAcessPassModalDisplayed}
                value={selectedAcessPass}
                loading={isDenyAccessPassLoading}
                onClose={toggleDenyAccessPassModal}
                onSubmit={handleDenyAccessPass}
              />
            )}
            {/* AVOID MOUNTING */}
            {isAccessPassDetailModalDisplayed && (
              <AccessPassDetailsModal
                isOpen={isAccessPassDetailModalDisplayed}
                value={selectedAcessPass}
                onClose={toggleAccessPassDetailModal}
              />
            )}
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
