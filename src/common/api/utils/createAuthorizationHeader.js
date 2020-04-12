export const createAuthorizationHeader = (token, apiKey) => ({
  Authorization: `Bearer ${token}`,
  'RP-API-KEY': apiKey,
});
