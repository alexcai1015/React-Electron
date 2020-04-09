import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as HttpProvider } from 'use-http';

import { theme } from './theme';
import createHistory from './history';
import { store, persistor } from './store';
import { AppRoutes } from './AppRoutes';
import { SnackbarProvider } from './context';
import { baseURL } from './common/api';

export function App() {
  const history = createHistory();
  return (
    <HttpProvider url={baseURL}>
      {/* <GoogleAnalytics /> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <MuiThemeProvider theme={theme}>
              <SnackbarProvider>
                <AppRoutes history={history} />
              </SnackbarProvider>
              <CssBaseline />
            </MuiThemeProvider>
          </Router>
        </PersistGate>
      </Provider>
    </HttpProvider>
  );
}

export default App;
