export const createAPIKeyHeader = () => {
  const apiKey = process.env.REACT_APP_API_KEY || window.REACT_APP_API_KEY;

  if (!apiKey) {
    return {};
  }

  return {
    'RP-API-KEY': apiKey,
  };
};
