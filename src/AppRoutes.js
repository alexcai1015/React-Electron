import React from 'react';
import { Switch, Route, Redirect as ReactRouterRedirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Dashboard } from './dashboard/pages/Dashboard';
import { Login } from './login';
import { getUserToken } from './store/slices';

/** catch-all */
const NotFoundRoute = ({ fallback = '/' }) => <ReactRouterRedirect to={fallback} />;

export function Redirect(props) {
  return props.to ? <ReactRouterRedirect {...props} /> : null;
}

function ProtectedRoute({ component: Component, accessCode, ...rest }) {
  const authenticated = !!accessCode;

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <React.Fragment {...props}>
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )}
    />
  );
}

export const PROTECTED_ROUTES = [
  {
    path: '/',
    exact: true,
    title: 'Dashboard',
    component: Dashboard,
  },
];

export function AppRoutes() {
  const token = useSelector(getUserToken);
  return (
    <Switch>
      <Route exact path="/login" render={({ history }) => <Login history={history} />} />
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
