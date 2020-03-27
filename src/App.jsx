import React from 'react';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <div>BASE ROUTE</div>} />
    </Switch>
  );
};

export default App;
