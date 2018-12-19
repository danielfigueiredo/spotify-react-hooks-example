import { Store } from 'redux';

import { IState } from 'src/app/store/app.types';
import { IService } from 'src/services/service.types';
import { ITokenService } from 'src/services/token/token.types';
import { Omit } from 'src/utils/typescript';

import {
  selectAccessToken,
  selectRefreshToken,
} from './user-token.selectors';
import { setUserTokenAction } from './user-token.actions';
import { IUserTokenState } from './user-token.types';

export type IAccessToken = Pick<IUserTokenState, 'accessToken'>;

export const connectUserTokenFactory = (
  {
    dispatch,
    getState,
  }: Store<IState>,
  refreshTokenService: ITokenService,
) => {
  const connectRefreshToken = <Input, Output>(service: IService<Input, Output>): IService<Input, Output> => {
    return function connectedService(input: Input): Promise<Output> {
      return service(input)
        .catch((error: Response) => {
          if (error.status === 401) {
            const refreshToken = selectRefreshToken(getState());
            return refreshTokenService(refreshToken)
              .then((userToken) => {
                dispatch(setUserTokenAction(userToken));
                return service(input);
              })
              .catch((error) => Promise.reject(error));
          }
          return Promise.reject(error);
        });
    }
  };

  const withAccessToken = <Input extends IAccessToken, Output>(
    service: IService<Input, Output>,
  ): IService<Omit<Input, 'accessToken'>, Output> => {
    return (input: Omit<Input, 'accessToken'>) => {
      const accessToken: IAccessToken = { accessToken: selectAccessToken(getState()) };
      const inputWithAccessToken: Input = { ...input, ...accessToken } as Input;
      return service(inputWithAccessToken);
    };
  };

  return {
    connectRefreshToken,
    withAccessToken,
  };
};
