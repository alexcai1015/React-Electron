export const createAuthorizationHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});
