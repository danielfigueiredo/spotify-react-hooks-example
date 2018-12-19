import { selectIsSessionValid } from 'src/core/user/token/user-token.selectors';
import {
  connect,
} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from 'src/app/store/app.types';
import { ConnectComponentEnhancer } from 'src/utils/typescript';

export type ISessionProviderProps = { isSessionValid: boolean };

export const sessionProviderContainer = <C extends ConnectComponentEnhancer<C, ISessionProviderProps>>(component: C) =>
  connect<ISessionProviderProps, {}, {}, IState>(
    createStructuredSelector<IState, ISessionProviderProps>({
      isSessionValid: selectIsSessionValid,
    }),
  )(component);
