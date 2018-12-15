import React from 'react';
import { Provider } from 'react-redux';

import { Router } from 'src/router';

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export const App = () => (
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Router />
    </Provider>
  </PersistGate>
);
