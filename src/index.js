import React from 'react';
import ReactDOM from 'react-dom';
import { FlagsProvider } from 'react-unleash-flags';

import { App } from './App';
import { flagConfig } from "./common/components/FeatureToggle";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <FlagsProvider config={flagConfig}>
      <App />
    </FlagsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
