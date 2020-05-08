import { useState, useCallback, useEffect, useRef } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import { httpGet } from '../api';
import { objToEncodedURI, applyPathParams, getConfig } from '../utils';
import { maybe } from '../../utils/monads';

const maybeObject = maybe({});

export const useApiQuery = (url, httpConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ httpResponse: null, data: null });
  const [error, setError] = useState(null);
  const { keycloak } = useKeycloak();
  const unmounted = useRef(false);
  const { token } = keycloak;
  const baseConfig = maybeObject(httpConfig);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const reset = () => {
    setIsLoading(false);
    setData({ httpResponse: null, data: null });
    setError(null);
  };

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
        const config = getConfig({ baseConfig, token });
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
    [url, baseConfig, token]
  );

  return {
    ...data,
    isLoading,
    error,
    query,
    reset,
  };
};
