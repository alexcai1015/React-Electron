import { useState } from 'react';
import { useSelector } from 'react-redux';

import { HttpMethod, baseURL } from '../api';
import { maybe } from '../utils/monads';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useUploadFile = (url) => {
  const token = useSelector((state) => state.user.token);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }

    const { status } = xhr;
    const isSuccess = isRequestSuccess(status);

    if (isSuccess) {
      setResponse(xhr.response);
    } else {
      let errorMessage = maybe(`There's an error uploading your file. Please try again.`)(
        xhr.statusText
      );

      errorMessage +=
        xhr.response && JSON.parse(xhr.response).message
          ? `: ${JSON.parse(xhr.response).message}`
          : '';

      setError(errorMessage);
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
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
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
