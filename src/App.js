import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from './theme';
import createHistory from './history';
import createStore from './store';
import { AppRoutes } from './AppRoutes';


export function App() {
  const history = createHistory();
  const store = createStore(history);
  return (
    <Provider store={store}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <AppRoutes history={history} />
          <CssBaseline />
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
