import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageSpinner from '../common/components/PageSpinner';
import { saveUser } from '../store/slices';

export const Auth = () => {
  const [keycloak] = useKeycloak();
  const { authenticated } = keycloak;
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProfile() {
      const profile = await keycloak.loadUserProfile();
      const { token } = keycloak;
      const xsrfToken = keycloak.sessionId;
      const user = { ...profile, token, xsrfToken };

      // console.log('saving user', user);

      dispatch(
        saveUser({
          ...user,
        })
      );

      push('/access-passes');
    }

    if (authenticated === true) {
      loadProfile();
    } else {
      // console.log('redirect out');
    }
  }, [push, authenticated, keycloak, dispatch]);

  // keycloak.onReady(() => {
  //   console.log('we are ready');
  // });

  return <PageSpinner />;
};
