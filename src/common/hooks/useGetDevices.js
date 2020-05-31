import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useApiQuery } from '../api';
import { maybe } from '../utils';
import { getCheckpointDevices, saveCheckpointDevices } from '../../store/slices';
import { isUnauthorized } from '../api/utils';

import { useLogout } from './useLogout';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

const maybeArray = maybe([]);
const maybeBlank = maybe('');
const maybeObject = maybe({});
const maybeZero = maybe(0);

const mapDevices = (data) => ({
  ...data,
  mobileNumber: maybeBlank(data.mobileNumber),
  brand: maybeBlank(data.brand),
  model: maybeBlank(data.model),
  imei: maybeBlank(data.imei),
  status: maybeBlank(data.status),
})

export const useGetDevices = () => {

  const dispatch = useDispatch();
  const checkpointDevices = useSelector(getCheckpointDevices);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const { data, error, isLoading, query, reset, ...others } = useApiQuery(
    '/v1/registry/scanner-devices'
  );
  const { execute: executeLogout } = useLogout();

  const {
    data: DeviceList,
    currentPage: dataCurrentPage,
    totalPages: dataTotalPages,
    totalRows: dataTotalRows,
    ...otherData
  } = maybeObject(data);
  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;
  const list = Array.isArray(DeviceList) ? DeviceList.map(mapDevices) : [];
  useEffect(() => {
    if (isSuccess) {
      dispatch(saveCheckpointDevices(list));
      setPage(dataCurrentPage);
      setTotalPages(dataTotalPages);
      setTotalRows(dataTotalRows);
      reset();
    }

    if (error && isUnauthorized(error)) {
      executeLogout();
    }
  }, [
    dataCurrentPage,
    dataTotalPages,
    dataTotalRows,
    list,
    dispatch,
    isSuccess,
    reset,
    error,
    executeLogout,
  ]);

  return {
    data: {
      list: maybeArray(checkpointDevices),
      page: maybeZero(page),
      totalPages: maybeZero(totalPages),
      totalRows: maybeZero(totalRows),
      ...otherData
    },
    isLoading,
    reset,
    query,
    isSuccess,
    error,
    ...others,
  };
};
