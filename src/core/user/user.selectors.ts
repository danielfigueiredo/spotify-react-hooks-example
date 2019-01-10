import { IState } from 'src/app/store/app.types';

import { IUserState } from './user.types';

export const selectUserState = (state: IState): IUserState => state.user;
