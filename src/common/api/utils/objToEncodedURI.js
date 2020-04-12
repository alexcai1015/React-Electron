export const objToEncodedURI = (obj) => {
  return Object.entries(obj)
    .filter(([, paramValue]) => typeof paramValue !== 'undefined')
    .map(
      ([paramKey, paramValue]) =>
        `${encodeURIComponent(paramKey)}=${encodeURIComponent(paramValue)}`
    )
    .join('&');
};
