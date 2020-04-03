import { useState, useCallback, useEffect, useRef } from 'react';

import { httpGet } from '../api';
import { objToEncodedURI, applyPathParams } from '../utils';
import { maybe } from '../../utils/monads';

const maybeObject = maybe({});

export const useApiQuery = (url, config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ httpResponse: null, data: null });
  const [error, setError] = useState(null);
  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const query = useCallback(
    async ({ urlQueryParams, urlPathParams } = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const urlWithPathParams = applyPathParams(url)(maybeObject(urlPathParams));
        const encodedURIParams = objToEncodedURI(maybeObject(urlQueryParams));
        const queryUrl = encodedURIParams
          ? [urlWithPathParams, encodedURIParams].join('?')
          : urlWithPathParams;
        const httpQueryResponse = await httpGet(queryUrl, config);

        if (!unmounted.current) {
          setData({
            data: httpQueryResponse.data,
            httpResponse: httpQueryResponse,
          });
        }
      } catch (_error) {
        if (!unmounted.current) {
          setError(_error);
        }
      } finally {
        if (!unmounted.current) {
          setIsLoading(false);
        }
      }
    },
    [url, config, setData, setError]
  );

  return {
    ...data,
    isLoading,
    error,
    query,
  };
};
