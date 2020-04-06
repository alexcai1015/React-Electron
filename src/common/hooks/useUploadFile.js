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
      setError(xhr.statusText || `There's an error uploading your file. Please try again.`);
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

  const reset = () => {
    setError(null);
    setIsLoading(false);
    setResponse(null);
    setIsCompleted(false);
  };

  return {
    error,
    isLoading,
    response,
    isCompleted,
    execute,
    reset,
  };
};
