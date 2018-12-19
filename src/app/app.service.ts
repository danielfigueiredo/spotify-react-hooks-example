import { connectRefreshTokenFactory } from 'src/core/user/token/user-token.connector';
import { refreshTokenService } from 'src/services/token/token.service';

import { store } from './store';

export const connectRefreshToken = connectRefreshTokenFactory(store, refreshTokenService);
