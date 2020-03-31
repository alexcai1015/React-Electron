export const objToEncodedURI = (obj) => {
  return Object.entries(obj)
    .map(
      ([paramKey, paramValue]) =>
        `${encodeURIComponent(paramKey)}=${encodeURIComponent(paramValue)}`
    )
    .join('&');
};
