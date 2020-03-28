import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import CreateApp from './CreateApp';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <CreateApp />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
