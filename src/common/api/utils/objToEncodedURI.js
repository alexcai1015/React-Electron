export const objToEncodedURI = (obj) => {
  return (
    Object.entries(obj)
      // eslint-disable-next-line no-unused-vars
      .filter(([paramKey, paramValue]) => typeof paramValue !== 'undefined')
      .map(
        ([paramKey, paramValue]) =>
          `${encodeURIComponent(paramKey)}=${encodeURIComponent(paramValue)}`
      )
      .join('&')
  );
};
