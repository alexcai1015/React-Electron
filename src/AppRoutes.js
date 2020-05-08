import React, { useEffect } from 'react';
import { Switch, Route, Redirect as ReactRouterRedirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web';

import { Login } from './pages/Login';
import { ActivateUser } from './pages/ActivateUser';
import { PROTECTED_ROUTES } from './common/components/navigationBar/ProtectedRoutes';
import { NavigationBar } from './common/components/navigationBar/NavigationBar';
import { getUserToken, getUsername } from './store/slices';
import { Auth } from './pages/Auth';

/* catch-all */
const NotFoundRoute = ({ fallback = '/' }) => <ReactRouterRedirect to={fallback} />;

NotFoundRoute.propTypes = {
  fallback: PropTypes.string,
};

function ProtectedRoute({ component: Component, accessCode, role, ...rest }) {
  const username = useSelector(getUsername);
  const { keycloak } = useKeycloak();
  const { authenticated } = keycloak;
  const { location, push } = useHistory();
  const hasRole = keycloak.hasRealmRole(role);

  useEffect(() => {
    // user is authenticated but does not have the correct user role,
    // throw out
    if (authenticated && hasRole !== true) {
      push('/login');
    }
  }, [hasRole, authenticated, push]);

  const getElement = ({ ...props }) =>
    authenticated ? (
      <>
        <NavigationBar username={username} />
        <Component {...props} />
      </>
    ) : (
      <ReactRouterRedirect
        to={{
          pathname: '/auth/login',
          state: {
            from: location.pathname,
          },
        }}
      />
    );

  return <Route {...rest} render={getElement} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
  accessCode: PropTypes.string.isRequired,
  role: PropTypes.string,
};

export function AppRoutes() {
  const token = useSelector(getUserToken);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <ReactRouterRedirect
            to={{
              pathname: '/access-passes',
            }}
          />
        )}
      />
      <Route exact path="/login" render={({ history }) => <Login history={history} />} />
      <Route exact path="/activate-user" render={() => <ActivateUser />} />
      <Route exact path="/auth/:authAction" render={() => <Auth />} />

      {PROTECTED_ROUTES.map(({ path, component, exact, role }) => (
        <ProtectedRoute
          accessCode={token}
          key="path"
          path={path}
          component={component}
          exact={exact}
          role={role}
        />
      ))}
      <Route component={NotFoundRoute} />
    </Switch>
  );
}

export default AppRoutes;
