export const applyPathParams = (url) => (pathParams = {}) =>
  Object.entries(pathParams).reduce(
    (currentUrl, [key, value]) => currentUrl.replace(`{{${key}}}`, value),
    url
  );
