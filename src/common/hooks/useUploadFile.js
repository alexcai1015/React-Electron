import { useState } from 'react';

import { HttpMethod, baseURL } from '../api';

export const useUploadFile = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      setResponse(xhr.response);
    } else {
      setError(xhr.statusText);
    }

    setIsCompleted(true);
    setIsLoading(false);
  };

  const execute = (blob) => {
    setIsCompleted(false);
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', blob);

    const newUrl = [baseURL, url].join('');
    xhr.open(HttpMethod.Post, newUrl, true);
    xhr.send(formData);
  };

  return {
    error,
    isLoading,
    response,
    isCompleted,
    execute,
  };
};
