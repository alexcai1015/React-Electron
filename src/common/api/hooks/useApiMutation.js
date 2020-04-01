import { useState } from 'react';

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
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [httpResponse, setHttpResponse] = useState(null);

  const execute = async ({ requestData, urlQueryParams, urlPathParams } = {}) => {
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
        setHttpResponse(httpMutationResponse);
      } else {
        const httpMutationResponse = await mutationMethod(
          urlWithPathParams,
          maybeObject(requestData),
          config
        );
        setHttpResponse(httpMutationResponse);
        setData(httpResponse.data);
      }
    } catch (_error) {
      setError(_error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    execute,
    httpResponse,
  };
};
