import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Dashboard } from './dashboard/pages/Dashboard';

export function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <div>BASE ROUTE</div>} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default AppRoutes;
