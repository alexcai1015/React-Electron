import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { stringifyUrl } from 'query-string';

const axiosFetcher = (axiosConfig) => (url) => {
  const baseConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: process.env.REACT_APP_API_URL,
  };
  const config = { ...baseConfig, ...axiosConfig };
  return axios(url, config);
};

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const useQuery = (
  url,
  { axiosConfig, swrConfig, transformer } = {
    axiosConfig: {},
    swrConfig: {},
    transformer: null,
  }
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState(null);
  const fetcher = axiosFetcher({
    ...axiosConfig,
    method: HttpMethod.GET,
  });

  useSWR(
    () => {
      if (queryParams) {
        return stringifyUrl({
          url,
          query: queryParams,
        });
      }

      return url;
    },
    fetcher,
    {
      onSuccess: (response) => {
        setIsLoading(false);
        setData(transformer ? transformer(response.data) : response.data);
      },
      onError: (err) => {
        setIsLoading(false);
        setError(err);
      },
      ...swrConfig,
    }
  );

  const execute = (newQueryParams) => {
    setQueryParams(newQueryParams);
  };

  return {
    data,
    error,
    isLoading,
    execute,
  };
};

export const useMutation = (
  url,
  method = HttpMethod.POST,
  { axiosConfig, transformer } = {
    axiosConfig: {},
    transformer: null,
  }
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState(null);
  const fetcher = axiosFetcher({
    ...axiosConfig,
    method,
  });

  const { mutate } = useSWR(
    () => {
      if (queryParams) {
        return stringifyUrl({
          url,
          query: queryParams,
        });
      }

      return url;
    },
    fetcher,
    {
      onSuccess: (response) => {
        setIsLoading(false);

        if (response.status !== 201) {
          setData(transformer ? transformer(response.data) : response.data);
        }
      },
      onError: (err) => {
        setIsLoading(false);
        setError(err);
      },
    }
  );

  const execute = (
    { queryParams: newQueryParams, data: newData } = { queryParams: {}, data: {} }
  ) => {
    setQueryParams(newQueryParams);
    mutate(newData);
  };

  return {
    data,
    execute,
    error,
    isLoading,
  };
};
