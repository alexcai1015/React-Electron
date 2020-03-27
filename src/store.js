import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './rootReducer';

export default (history) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware.withExtraArgument({ history })],
  });

  return store;
};
