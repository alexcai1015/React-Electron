import { useKeycloak } from '@react-keycloak/web';
export const RoleBasedComponent = ({ role, children }) => {
  const { keycloak } = useKeycloak();
  const authenticated = keycloak.authenticated && keycloak.hasRealmRole(role);
  keycloak.hasResourceRole();
  return authenticated && children;
};
