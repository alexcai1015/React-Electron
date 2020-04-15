export const isHttpResponseSuccess = (status) => status === 0 || (status >= 200 && status < 400);
