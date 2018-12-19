import { combineReducers, Reducer, Store } from 'redux';
import { persistReducer, Persistor } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

import { userReducer } from 'src/core/user/user.reducer';
import { IUserState } from 'src/core/user/user.types';

import {
  IActions,
  ILoadedReducers,
  ILoadedState,
} from './app.types';

let asyncReducers: ILoadedReducers = {};

const persistConfig = (key: string) => ({
  storage: sessionStorage,
  key,
});

export const createRootReducer = (): Reducer<ILoadedState, any> => {
  const initialReducers: ILoadedReducers = {
    user: persistReducer<IUserState, IActions>(persistConfig('user'), userReducer),
    ...asyncReducers,
  };

  return combineReducers<ILoadedState>(initialReducers);
};

export const injectReducer = (
  store: Store<ILoadedState> & { persistor: Persistor },
  reducers: ILoadedReducers,
) => {
  asyncReducers = { ...asyncReducers, ...reducers };
  store.replaceReducer(createRootReducer());
  store.persistor.persist();
};
