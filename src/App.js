import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';

import { theme } from './theme';
import createHistory from './history';
import { store, persistor } from './store';
import { AppRoutes } from './AppRoutes';
import { SnackbarProvider } from './context';
import { Maintenance } from './pages/Maintenance';
import { FeatureToggle } from './common/components/FeatureToggle';

export function App() {
  const env = process.env.REACT_APP_ENV || process.env.NODE_ENV;
  const history = createHistory();

  return (
    <FeatureToggle featureKey="maintenance" fallback={<Maintenance />} environment={env}>
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
    </FeatureToggle>
  );
}

export default App;
