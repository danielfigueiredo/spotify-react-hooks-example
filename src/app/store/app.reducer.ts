import { combineReducers, Reducer, Store } from 'redux';
import {
  ILoadedReducers,
  ILoadedState,
} from './app.types';
import { userReducer } from '../../core/user/user.reducer';

let asyncReducers: ILoadedReducers = {};

export const createRootReducer = (): Reducer<ILoadedState, any> => {
  const initialReducers: ILoadedReducers = {
    user: userReducer,
    ...asyncReducers,
  };
  return combineReducers<ILoadedState>(initialReducers);
};

export const injectReducer = (store: Store<ILoadedState>, reducers: ILoadedReducers) => {
  asyncReducers = { ...asyncReducers, ...reducers };
  store.replaceReducer(createRootReducer())
};
