import { combineReducers, Reducer, Store } from 'redux';
import { persistReducer, Persistor } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

import { ILoadedReducers, ILoadedState } from './app.types';

import { userReducer } from 'src/core/user/user.reducer';
import { IUserState } from 'src/core/user/user.types';

let asyncReducers: ILoadedReducers = {};

const persistConfig = (key: string) => ({
  storage: sessionStorage,
  key,
});

export const createRootReducer = (): Reducer<ILoadedState, any> => {
  const initialReducers: ILoadedReducers = {
    user: persistReducer<IUserState, any>(persistConfig('user'), userReducer),
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
