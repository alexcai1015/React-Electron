import { useState, useCallback } from 'react';

import { httpGet } from '../api';
import { objToEncodedURI, applyPathParams } from '../utils';
import { maybe } from '../../utils/monads';

const maybeObject = maybe({});

export const useApiQuery = (url, config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [httpResponse, setHttpResponse] = useState(null);

  const query = useCallback(
    async ({ urlQueryParams, urlPathParams }) => {
      setIsLoading(true);
      setError(null);

      try {
        const urlWithPathParams = applyPathParams(url)(maybeObject(urlPathParams));
        const encodedURIParams = objToEncodedURI(maybeObject(urlQueryParams));
        const queryUrl = encodedURIParams
          ? [urlWithPathParams, encodedURIParams].join('?')
          : urlWithPathParams;
        const httpQueryResponse = await httpGet(queryUrl, config);
        setHttpResponse(httpQueryResponse);
        setData(httpQueryResponse.data);
      } catch (_error) {
        setError(_error);
      } finally {
        setIsLoading(false);
      }
    },
    [url, config, setData, setError, setHttpResponse]
  );

  return {
    data,
    isLoading,
    error,
    query,
    httpResponse,
  };
};
