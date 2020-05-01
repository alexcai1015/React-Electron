import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageSpinner from '../common/components/PageSpinner';
import { saveUser } from '../store/slices';

export const Auth = ({ match }) => {
  const [keycloak] = useKeycloak();
  const { authenticated } = keycloak;
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { location } = match;

  // const location = this.props.location;
  // console.log('match', match);
  console.log('props', match);

  useEffect(() => {
    async function loadProfile() {
      const profile = await keycloak.loadUserProfile();
      const { token } = keycloak;
      const xsrfToken = keycloak.sessionId;
      const { username, attributes } = profile;
      const [strAportypes] = attributes.APORTYPES;
      const aporTypes = strAportypes.split(',').map((a) => a.trim());
      console.log('tokenparsed', keycloak.tokenParsed);
      console.log('profile', profile);
      console.log('idtoken', keycloak.idTokenParsed);

      dispatch(saveUser({ username, token, xsrfToken, aporTypes }));

      // @todo This should redirect to ?next=
      push('/');
    }

    switch (match.match.params.authAction) {
      case 'login':
        keycloak.login({
          redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/verify?next=`,
        });
        break;
      case 'verify':
        if (authenticated === true) {
          loadProfile();
        } else {
          // console.log('redirect out');
        }
        break;
      case 'register':
        keycloak.register({
          redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/verify?next=`,
        });
        break;
      case 'logout':
        keycloak.logout({
          redirectUri: `${process.env.REACT_APP_BASE_URL}/login?next=`,
        });
        break;
    }
  }, [push, authenticated, keycloak, dispatch, match]);

  return <PageSpinner />;
};
