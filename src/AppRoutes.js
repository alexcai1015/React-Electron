import React, { useEffect } from 'react';
import { Switch, Route, Redirect as ReactRouterRedirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { NavigationBar } from './common/components/NavigationBar';
import { Dashboard } from './dashboard/pages/Dashboard';
import { BulkUpload } from './bulkUpload/BulkUpload';
import { Login } from './pages/Login';
import { ActivateUser } from './pages/ActivateUser';
import { getUserToken, getUsername } from './store/slices';
import { useGetUserAporTypes } from './common/hooks';

/** catch-all */
const NotFoundRoute = ({ fallback = '/' }) => <ReactRouterRedirect to={fallback} />;

export function Redirect(props) {
  return props.to ? <ReactRouterRedirect {...props} /> : null;
}

function ProtectedRoute({ component: Component, accessCode, ...rest }) {
  const username = useSelector(getUsername);
  const authenticated = !!accessCode;
  const { query, isLoading } = useGetUserAporTypes();

  useEffect(() => {
    query(username);
  }, [query, username]);

  if (isLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <>
            <NavigationBar />
            <Component {...props} />
          </>
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          )
      }
    />
  );
}

export const PROTECTED_ROUTES = [
  {
    path: '/access-passes',
    exact: true,
    title: 'Approvals',
    component: Dashboard,
  },
  {
    path: '/bulk-upload',
    exact: true,
    title: 'Bulk Upload',
    component: BulkUpload,
  },
];

export function AppRoutes() {
  const token = useSelector(getUserToken);
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={{ pathname: '/access-passes' }} />} />
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
