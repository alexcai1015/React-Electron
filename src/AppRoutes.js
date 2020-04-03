import React from 'react';
import { Switch, Route, Redirect as ReactRouterRedirect, useLocation } from 'react-router-dom';

import { Dashboard } from './dashboard/pages/Dashboard';
import Login from './login';

/** catch-all */
const NotFoundRoute = ({ fallback = '/' }) => <ReactRouterRedirect to={(fallback)} />;

export function Redirect(props) {
  return props.to ? <ReactRouterRedirect {...props} /> : null;
}

function ProtectedRoute({ component: Component, accessCode, ...rest }) {
  // TODO: grab this accessCode from login or some authservice #19
  // TODO: toggle this to true to continue with dashboard component
  // const authenticated = !!accessCode;
  const authenticated = true;

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <React.Fragment {...props}>
            <Component {...props} />
          </React.Fragment>
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />
          )
      }
    />
  );
}

export const PROTECTED_ROUTES = [
  {
    path: '/',
    exact: true,
    title: 'Dashboard',
    component: Dashboard,
  }
]

/* TODO: for testing only. Use the reduxsetup to get the accessCode. Fornow add some bogus string in
 addressbar like?accessCode=asdasdasdasdasd */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function AppRoutes() {
  let query = useQuery();
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      {PROTECTED_ROUTES.map(({ path, component, exact }) => (
        <ProtectedRoute
          accessCode={query.get("accessCode")}
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
