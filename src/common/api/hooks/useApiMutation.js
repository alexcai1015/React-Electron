import { useState, useRef, useEffect } from 'react';

import { httpPost, httpPut, httpPatch, httpDelete } from '../api';
import { HttpMethod } from '../constants';
import { objToEncodedURI, applyPathParams } from '../utils';
import { maybe } from '../../utils/monads';

const getMutationMethod = (method) => {
  if (method === HttpMethod.Post) return httpPost;
  if (method === HttpMethod.Put) return httpPut;
  if (method === HttpMethod.Patch) return httpPatch;
  if (method === HttpMethod.Delete) return httpDelete;
  return httpPost;
};

const maybeObject = maybe({});

export const useApiMutation = (url, method, config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ httpResponse: null, data: null });
  const [error, setError] = useState(null);
  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const execute = async ({ requestData, urlQueryParams, urlPathParams }) => {
    setIsLoading(true);
    setError(null);

    try {
      const mutationMethod = getMutationMethod(method);
      const urlWithPathParams = applyPathParams(url)(maybeObject(urlPathParams));

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
  };
};
