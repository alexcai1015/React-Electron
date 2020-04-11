import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { httpPost, httpPut, httpPatch, httpDelete } from '../api';
import { HttpMethod } from '../constants';
import { objToEncodedURI, applyPathParams, getConfig } from '../utils';
import { maybe } from '../../utils/monads';

const getMutationMethod = (method) => {
  return (
    {
      [HttpMethod.Post]: httpPost,
      [HttpMethod.Put]: httpPut,
      [HttpMethod.Patch]: httpPatch,
      [HttpMethod.Delete]: httpDelete,
    }[method] || httpPost
  );
};

const maybeObject = maybe({});

export const useApiMutation = (url, method, httpConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ httpResponse: null, data: null });
  const [error, setError] = useState(null);
  const unmounted = useRef(false);
  const token = useSelector((state) => state.user.token);
  const maybeHttpConfig = maybeObject(httpConfig);

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

  const execute = async ({ requestData, urlQueryParams, urlPathParams }) => {
    setIsLoading(true);
    setError(null);

    try {
      const mutationMethod = getMutationMethod(method);
      const urlWithPathParams = applyPathParams(url)(maybeObject(urlPathParams));
      const config = getConfig({ baseConfig: maybeHttpConfig, token });

      if (method === HttpMethod.Delete) {
        const encodedURIParams = objToEncodedURI(maybeObject(urlQueryParams));
        const mutationUrl = encodedURIParams
          ? [urlWithPathParams, encodedURIParams].join('/')
          : urlWithPathParams;
        const httpMutationResponse = await mutationMethod(mutationUrl, config);

        if (!unmounted.current) {
          setData({ httpResponse: httpMutationResponse });
        }
      } else {
        const httpMutationResponse = await mutationMethod(
          urlWithPathParams,
          maybeObject(requestData),
          config
        );

        if (!unmounted.current) {
          setData({
            data: httpMutationResponse.data,
            httpResponse: httpMutationResponse,
          });
        }
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
  };

  return {
    ...data,
    isLoading,
    error,
    execute,
    reset,
  };
};
