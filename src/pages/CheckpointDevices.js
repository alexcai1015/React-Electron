import React, { useCallback, useState } from 'react';

import { styled, Box, Container, Grid, TextField, Button, MenuItem } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input';
import { useKeycloak } from '@react-keycloak/web';

import { useGetDevices, useToggle } from '../common/hooks';

import { useQueryString } from '../hooks';

import { AddCheckpointDeviceModal } from './checkpointDevices/AddCheckpointDeviceModal';
import { EditCheckpointDeviceModal } from './checkpointDevices/EditCheckpointDeviceModal';
import { DeleteCheckpointDeviceModal } from './checkpointDevices/DeleteCheckpointDeviceModal';
import { CheckpointDevicesList } from './checkpointDevices/CheckpointDevicesList';

import { KeycloakRoles } from '../common/constants';

const StatusFilterOption = {
  DeviceID: {
    value: 'id',
    label: 'Device ID',
  },
  MobileNumber: {
    value: 'mobile_number',
    label: 'Mobile Number',
  },
  IMEI: {
    value: 'imei',
    label: 'IMEI',
  },
  Brand: {
    value: 'brand',
    label: 'Brand',
  },
  Model: {
    value: 'model',
    label: 'Model',
  },
};

const FilterOptions = [
  StatusFilterOption.DeviceID,
  StatusFilterOption.MobileNumber,
  StatusFilterOption.IMEI,
  StatusFilterOption.Brand,
  StatusFilterOption.Model,
];

const createQueryObj = (selected, search) => FilterOptions.reduce(( accu, curr ) => {
  return {
    ...accu,
    [curr.value]: selected === curr.value ? search : ''
  };
} , {})

export const CheckpointDevices = () => {
  const { setQueryString } = useQueryString();
  const {
    query: getCheckpointDevices,
    data: { list, totalPages, totalRows },
    isLoading,
  } = useGetDevices();
  const [deviceId, setDeviceId] = useState(undefined);
  const [deviceDetails, setDeviceDetails] = useState(undefined);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    StatusFilterOption.DeviceID.value
  );
  const { on: isEditModalDisplayed, toggle: toggleEditModal } = useToggle();
  const { on: isDeleteModalDisplayed, toggle: toggleDeleteModal } = useToggle();
  const { keycloak } = useKeycloak();

  const allowSearch = keycloak.hasRealmRole(KeycloakRoles.HAS_SEARCH_DEVICE_RECORD_ACCESS);
  const allowAdd = keycloak.hasRealmRole(KeycloakRoles.HAS_ADD_DEVICE_RECORD_ACCESS);
  const allowEdit = keycloak.hasRealmRole(KeycloakRoles.HAS_UPDATE_DEVICE_RECORD_ACCESS);
  const allowDelete = keycloak.hasRealmRole(KeycloakRoles.HAS_DELETE_DEVICE_RECORD_ACCESS);

  const handleEditClicked = (deviceData) => {
    setDeviceDetails(deviceData);
    toggleEditModal();
  };

  const handleCloseEditModal = () => {
    setDeviceDetails(undefined);
    toggleEditModal();
  };

  const handleDeleteClicked = (id) => {
    setDeviceId(id);
    toggleDeleteModal();
  };

  const handleCloseDeleteModal = () => {
    setDeviceId(undefined);
    toggleDeleteModal();
  };

  const fetchData = useCallback(
    ({ filterOption, searchValue: search, pageIndex, pageSize }) => {
      const filters = createQueryObj(filterOption, search)
      getCheckpointDevices({
        urlQueryParams: { ...filters, pageNum: pageIndex, pageSize },
      });
    },
    [getCheckpointDevices]
  );

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchValue(search);
    const filters = createQueryObj(selectedFilterOption, search)
    setQueryString({
      queryString: filters,
    });
  };
  const handleFilterSelectChange = (e) => {
    const selected = e.target.value;
    setSelectedFilterOption(selected);
    const filters = createQueryObj(selected, searchValue)
    setQueryString({
      queryString: filters,
    });
  };

  return (
    <Box component="main">
      <S.PageHeaderBlock>
        <Container>
          <Grid container>
            <Grid item xs={10}>
              {allowSearch && (
                <>
                  <TextField
                    select
                    label="Filter by "
                    value={selectedFilterOption}
                    onChange={handleFilterSelectChange}
                    variant="outlined"
                  >
                    {FilterOptions.map(({ label, value }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <DebounceInput
                    element={S.SearchTextField}
                    debounceTimeout={500}
                    label="Search"
                    type="search"
                    variant="outlined"
                    onChange={handleSearch}
                  />
                </>
              )}
            </Grid>
            <Grid alignItems="center" container item xs={2}>
              {allowAdd && <AddCheckpointDeviceModal />}
            </Grid>
          </Grid>
        </Container>
      </S.PageHeaderBlock>
      <Container>
        <Grid>
          <Grid item xs={12}>
            <CheckpointDevicesList
              fetchData={fetchData}
              searchValue={searchValue}
              pageCount={totalPages}
              rowCount={totalRows}
              selectedFilterOption={selectedFilterOption}
              data={list}
              loading={isLoading}
              handleEdit={handleEditClicked}
              handleDelete={handleDeleteClicked}
              allowEdit={allowEdit}
              allowDelete={allowDelete}
            />
          </Grid>
        </Grid>
      </Container>

      {isDeleteModalDisplayed && (
        <DeleteCheckpointDeviceModal
          isOpen={isDeleteModalDisplayed}
          deviceId={deviceId}
          handleCloseModal={handleCloseDeleteModal}
        />
      )}
      {isEditModalDisplayed && (
        <EditCheckpointDeviceModal
          isOpen={isEditModalDisplayed}
          deviceDetails={deviceDetails}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </Box>
  );
};

const S = {
  AddDeviceButton: styled(Button)(({ theme }) => ({
    borderRadius: 20,
    textTransforma: 'capitalize',
    boxShadow: 'none',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
      boxShadow: 'none',
    },
  })),
  PageHeaderBlock: styled(Box)(({ theme }) => ({
    // ! TODO: use color value from theme
    borderBottom: '1px solid #DDDDDD',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  })),
  SearchTextField: styled(TextField)({
    marginLeft: '10px',
    minWidth: 300,
  }),
};
