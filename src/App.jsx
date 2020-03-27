import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './dashboard';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <div>BASE ROUTE</div>} />
      <Route exact path="/dashboard" component={() => <Dashboard />} />
    </Switch>
  );
};

export default App;
