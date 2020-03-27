import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './login';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
};

export default App;
