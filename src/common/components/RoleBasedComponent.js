import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
export const RoleToggle = ({ role, children, deniedContent }) => {
  const { keycloak } = useKeycloak();

  const authenticated = keycloak.authenticated && keycloak.hasRealmRole(role);
  if (authenticated === false) {
    return deniedContent ? deniedContent : <></>;
  }
  return children;
};
