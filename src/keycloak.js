import Keycloak from 'keycloak-js';

const cfg = {
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID,
};

const keycloak = new Keycloak(cfg);

export default keycloak;
