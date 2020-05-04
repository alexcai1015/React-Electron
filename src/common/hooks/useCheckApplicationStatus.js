import { useEffect, useState, useCallback } from 'react';

import { useApiQuery } from '../api';
import { maybe } from '../utils';
import { isUnauthorized } from '../api/utils';

import { useLogout } from './useLogout';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

const maybeObject = maybe({});

export const useCheckApplicationStatus = () => {
  const [applicationStatus, setApplicationStatus] = useState({});

  const { data, error, isLoading, query: get, reset: apiDataReset, ...others } = useApiQuery(
    '/v1/registry/access-passes/{{referenceId}}'
  );

  const { execute: executeLogout } = useLogout();

  const { status, controlCode } = maybeObject({ ...data });

  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;

  useEffect(() => {
    if (isSuccess) {
      setApplicationStatus({ status, controlCode });
      apiDataReset();
    }

    if (error && isUnauthorized(error)) {
      executeLogout();
    }
  }, [status, controlCode, isSuccess, error, apiDataReset, executeLogout]);

  const query = useCallback(
    ({ referenceId }) => {
      get({ urlPathParams: { referenceId } });
    },
    [get]
  );

  const reset = () => {
    setApplicationStatus({});
    apiDataReset();
  };

  return {
    data: maybeObject(applicationStatus),
    isLoading,
    reset,
    query,
    isSuccess,
    error,
    ...others,
  };
};
