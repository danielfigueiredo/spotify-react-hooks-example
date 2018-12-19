import { createStore, applyMiddleware, Store } from 'redux';
import logger from 'redux-logger';

import { createRootReducer } from './app.reducer';
import { Persistor, persistStore } from 'redux-persist';
import { IState } from './app.types';

export const store = createStore(createRootReducer(), applyMiddleware(logger)) as Store<IState>;

export const persistor: Persistor = persistStore(store) as Persistor;
