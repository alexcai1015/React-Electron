import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import createHistory from './history';
import createStore from './store';
import App from './App';

export default () => {
  const history = createHistory();
  const store = createStore(history);
  return (
    <Provider store={store}>
      <Router history={history}>
        <App history={history} />
      </Router>
    </Provider>
  );
};
