const getCookies = () =>
  document.cookie.split(';').reduce((acc, cookieKeyValue) => {
    const [cookieKey, cookieValue] = cookieKeyValue.split('=');

    return {
      ...acc,
      [cookieKey]: cookieValue,
    };
  }, {});

export const xsrfTokenInterceptor = (config) => {
  const { xsrfToken } = getCookies();

  if (!xsrfToken) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      'X-XSRF-TOKEN': xsrfToken,
    },
  };
};
