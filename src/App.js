import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import createHistory from './history';
import createStore from './store';
import { AppRoutes } from './AppRoutes';

const theme = createMuiTheme({});

export function App() {
  const history = createHistory();
  const store = createStore(history);
  return (
    <Provider store={store}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <AppRoutes history={history} />
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
