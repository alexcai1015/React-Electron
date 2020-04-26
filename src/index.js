import React from 'react';
import ReactDOM from 'react-dom';
import { FlagsProvider } from 'react-unleash-flags';

import { App } from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

// we can also define the config in code instead of using env vars
const flagConfig = {
  appName: process.env.NODE_ENV,
  url: 'https://gitlab.com/api/v4/feature_flags/unleash/17749136',
  instanceId: 'ruL9XsszeoKcFRbAwz9S',
};

if (!!root) {
  ReactDOM.render(
    <React.StrictMode>
      <FlagsProvider config={flagConfig}>
        <App />
      </FlagsProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
