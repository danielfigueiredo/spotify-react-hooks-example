import { createStore, applyMiddleware, Store } from 'redux';
import logger from 'redux-logger';

import { createRootReducer } from './app.reducer';
import { Persistor, persistStore } from 'redux-persist';
import { ILoadedState } from './app.types';

const reduxStore = createStore(createRootReducer(), applyMiddleware(logger));

export const persistor: Persistor = persistStore(reduxStore) as Persistor;

export const store: Store<ILoadedState> = reduxStore;