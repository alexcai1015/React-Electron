import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './dashboard';

import Login from './login';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={() => <Dashboard />} />
    </Switch>
  );
};

export default App;
