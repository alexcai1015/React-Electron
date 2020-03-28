import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Dashboard } from './dashboard/pages/Dashboard';
import Login from './login';

export function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/lists/:accessPassId/deny" component={Dashboard} />
    </Switch>
  );
}

export default AppRoutes;
