import { createStore } from 'redux';
import { createRootReducer } from './app.reducer';

export const store = createStore(createRootReducer());
