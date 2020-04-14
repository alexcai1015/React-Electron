import React, { useCallback, useState, useEffect } from 'react';
import { Box, Container, Grid, MenuItem, TextField, styled } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input';

import { useGetAccessPasses, useToggle, useDenyAccessPass } from '../../common/hooks';
import { ApprovalStatus, Source } from '../../common/constants';
import { useApproveAccessPass } from '../../common/hooks/useApproveAccessPass';
import { useQueryString } from '../../hooks';

import { ListTable } from './dashboard/ListTable';
import { AccessPassDenyModal } from './dashboard/listTable/AccessPassDenyModal';
import { AccessPassDetailsModal } from './dashboard/listTable/AccessPassDetailsModal';

/** use this to init any new queryparams */
const DefaultQueryParams = Object.freeze({
  source: Source.Online,
});

const StatusFilterOption = {
  ShowAll: {
    value: 'show_all',
    label: 'Show All',
  },
  Pending: {
    value: ApprovalStatus.Pending,
    label: 'Pending',
  },
  Approved: {
    value: ApprovalStatus.Approved,
    label: 'Approved',
  },
  Declined: {
    value: ApprovalStatus.Declined,
    label: 'Declined',
  },
};

const StatusFilterOptions = [
  StatusFilterOption.ShowAll,
  StatusFilterOption.Pending,
  StatusFilterOption.Approved,
  StatusFilterOption.Declined,
];

export const Dashboard = () => {
  const { queryString, setQueryString } = useQueryString();

  const [searchValue, setSearchValue] = useState('');
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    (queryString && queryString.status) || StatusFilterOption.ShowAll.value
  );
  const [selectedAcessPass, setSelectedAccesPass] = useState(undefined);
  const { on: isDenyAcessPassModalDisplayed, toggle: toggleDenyAccessPassModal } = useToggle();
  const { on: isAccessPassDetailModalDisplayed, toggle: toggleAccessPassDetailModal } = useToggle();
  const {
    data: { list: accessPasses, totalPages, totalRows },
    isLoading: isGetAccessPassesLoading,
    query: getAccessPassesQuery,
  } = useGetAccessPasses();

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

    // Always reset to `1` when selecting new filter status
    setQueryString({
      queryString: {
        page: 1,
        status: nextFilterValue,
      },
    });
  };

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    setSearchValue(searchQuery);

    if (!searchQuery) {
      const newQueryString = { ...queryString, search: undefined };

      setQueryString({
        queryString: newQueryString,
      });

      return;
    }

    setQueryString({
      queryString: {
        ...queryString,
        search: searchQuery,
      },
    });
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
    ({ filters, pageIndex, pageSize, search }) => {
      const statusFilter = filters.find(({ id }) => id === 'status');

      const statusFilterValue = statusFilter.value;

      const status = statusFilterValue === 'show_all' ? undefined : statusFilterValue.toUpperCase();

      getAccessPassesQuery({
        urlQueryParams: {
          ...DefaultQueryParams,
          pageNo: pageIndex,
          maxPageRows: pageSize,
          status,
          search,
        },
      });
    },
    [getAccessPassesQuery]
  );

  return (
    <Box>
      <Box component="main">
        <StyledFiltersBlock>
          <Container>
            <Grid container spacing={2} justify="space-between">
              <Grid item lg={8} md={6} sm={6} xs={12}>
                <DebounceInput
                  element={StyledSearchTextField}
                  debounceTimeout={500}
                  label="Search"
                  type="search"
                  onChange={handleSearchChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
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
              {/* <Grid container justify="flex-end" item lg={4} md={6} sm={12} xs={12}>

              </Grid> */}
            </Grid>
          </Container>
        </StyledFiltersBlock>

        <Box py={3}>
          <Container>
            <ListTable
              data={accessPasses}
              fetchData={fetchData}
              filterStatus={selectedFilterOption}
              loading={isGetAccessPassesLoading}
              pageCount={totalPages}
              searchValue={searchValue}
              disabledActions={isDenyAccessPassLoading || isApproveAccessPassLoading}
              rowCount={totalRows}
              pageIndex={queryString && +queryString.page - 1}
              pageSize={queryString && +queryString.pageSize}
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

const StyledFilterSelectTextField = styled(TextField)({
  minWidth: 180,
});

const StyledSearchTextField = styled(TextField)({
  minWidth: 350,
});
