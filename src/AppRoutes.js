import React, { useEffect } from 'react';
import { Switch, Route, Redirect as ReactRouterRedirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Login } from './pages/Login';
import { ActivateUser } from './pages/ActivateUser';
import { PROTECTED_ROUTES } from './common/components/navigationBar/ProtectedRoutes';
import { NavigationBar } from './common/components/navigationBar/NavigationBar';
import { getUserToken, getUsername } from './store/slices';
import { useGetUserAporTypes } from './common/hooks';
import PageSpinner from './common/components/PageSpinner';

/* catch-all */
const NotFoundRoute = ({ fallback = '/' }) => <ReactRouterRedirect to={fallback} />;

NotFoundRoute.propTypes = {
  fallback: PropTypes.string,
};

function ProtectedRoute({ component: Component, accessCode, ...rest }) {
  const username = useSelector(getUsername);
  const authenticated = !!accessCode;
  const { query, isLoading } = useGetUserAporTypes();

  useEffect(() => {
    query(username);
  }, [query, username]);

  if (isLoading) {
    return <PageSpinner />;
  }

  const getElement = ({ ...props }) =>
    authenticated ? (
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
};

export function AppRoutes() {
  const token = useSelector(getUserToken);
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <ReactRouterRedirect to={{ pathname: '/access-passes' }} />}
      />
      <Route exact path="/login" render={({ history }) => <Login history={history} />} />
      <Route exact path="/activate-user" render={() => <ActivateUser />} />

      {PROTECTED_ROUTES.map(({ path, component, exact }) => (
        <ProtectedRoute
          accessCode={token}
          key="path"
          path={path}
          component={component}
          exact={exact}
        />
      ))}
      <Route component={NotFoundRoute} />
    </Switch>
  );
}

export default AppRoutes;
