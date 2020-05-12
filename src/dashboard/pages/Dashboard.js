import React, { useCallback, useState, useEffect } from 'react';
import { Box, Container, Grid, MenuItem, TextField, styled } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';

import { useGetAccessPasses, useToggle, useDenyAccessPass } from '../../common/hooks';
import { ApprovalStatus, PassType } from '../../common/constants';
import { useApproveAccessPass } from '../../common/hooks/useApproveAccessPass';
import { useSuspendAccessPass } from '../../common/hooks/useSuspendAccessPass';
import { useQueryString } from '../../hooks';
import { getUserAporTypes } from '../../store/slices';

import { ListTable } from './dashboard/ListTable';
import { AccessPassDenyModal } from './dashboard/listTable/AccessPassDenyModal';
import { AccessPassDetailsModal } from './dashboard/listTable/AccessPassDetailsModal';

/** use this to init any new queryparams */
const DefaultQueryParams = Object.freeze({
  passType: PassType.INDIVIDUAL.toUpperCase(),
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
  Suspended: {
    value: ApprovalStatus.Suspended,
    label: 'Suspended',
  },
};

const StatusFilterOptions = [
  StatusFilterOption.ShowAll,
  StatusFilterOption.Pending,
  StatusFilterOption.Approved,
  StatusFilterOption.Declined,
  StatusFilterOption.Suspended,
];

export const Dashboard = () => {
  const { queryString, setQueryString } = useQueryString();
  const aporTypes = useSelector(getUserAporTypes);

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

  const {
    execute: executeSuspendAccessPass,
    isLoading: isSuspendedAccessPassLoading,
  } = useSuspendAccessPass(selectedAcessPass);

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
        page: 1,
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

  const handleSuspendAccessPassClicked = (accessPass) => {
    const { referenceId } = accessPass;
    setSelectedAccesPass(accessPass);

    executeSuspendAccessPass(referenceId, {
      status: ApprovalStatus.Suspended.toUpperCase(),
    });
  };

  const handleDenyAccessPass = ({ referenceId, remarks } = {}) => {
    executeDenyAccessPass(referenceId, {
      status: ApprovalStatus.Declined.toUpperCase(),
      remarks,
    });
  };

  const fetchData = useCallback(
    ({ filters, pageIndex, pageSize, search }) => {
      const { value: statusFilterValue } = filters.find(({ id }) => id === 'status');

      const status = statusFilterValue === 'show_all' ? undefined : statusFilterValue.toUpperCase();

      getAccessPassesQuery({
        urlQueryParams: {
          ...DefaultQueryParams,
          search,
          pageNo: pageIndex,
          maxPageRows: pageSize,
          status,
          aporType: aporTypes.join(','),
        },
      });
    },
    [aporTypes, getAccessPassesQuery]
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
              disabledActions={
                isDenyAccessPassLoading ||
                isApproveAccessPassLoading ||
                isSuspendedAccessPassLoading
              }
              rowCount={totalRows}
              onApproveClick={handleApproveAccessPassClicked}
              onDenyClick={handleDenyAccessPassClicked}
              onSuspendClick={handleSuspendAccessPassClicked}
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
                allowEdit // TODO: set allowEdit to #126 permissions
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
