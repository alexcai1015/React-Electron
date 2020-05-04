import React, { useEffect } from 'react';
import { Switch, Route, Redirect as ReactRouterRedirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Login } from './pages/Login';
import { ActivateUser } from './pages/ActivateUser';
import { PROTECTED_ROUTES } from './common/components/navigationBar/ProtectedRoutes';
import { NavigationBar } from './common/components/navigationBar/NavigationBar';
import { getUserToken, getUsername } from './store/slices';
import { useGetUserAporTypes, useGetRole } from './common/hooks';
import PageSpinner from './common/components/PageSpinner';

/* catch-all */
const NotFoundRoute = ({ fallback = '/' }) => <ReactRouterRedirect to={fallback} />;

NotFoundRoute.propTypes = {
  fallback: PropTypes.string,
};

function ProtectedRoute({ component: Component, accessCode, allowedRole, ...rest }) {
  const username = useSelector(getUsername);
  const authenticated = !!accessCode;
  const { query, isLoading } = useGetUserAporTypes();
  const userRole = useGetRole();

  useEffect(() => {
    query(username);
  }, [query, username]);

  if (isLoading) {
    return <PageSpinner />;
  }

  const getElement = ({ ...props }) =>
    authenticated && (!allowedRole || allowedRole === userRole) ? (
      <>
        <NavigationBar username={username} />
        <Component {...props} />
      </>
    ) : (
      <ReactRouterRedirect
        to={{
          pathname: '/login',
        }}
      />
    );

  return <Route {...rest} render={getElement} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
  accessCode: PropTypes.string.isRequired,
  allowedRole: PropTypes.string,
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

      {PROTECTED_ROUTES.map(({ path, component, exact, allowedRole = null }) => (
        <ProtectedRoute
          accessCode={token}
          key="path"
          path={path}
          component={component}
          exact={exact}
          allowedRole={allowedRole}
        />
      ))}
      <Route component={NotFoundRoute} />
    </Switch>
  );
}

export default AppRoutes;
