import {
  useEffect,
  useState,
} from 'react';

import { IUserTokenState } from 'src/core/user/token/user-token.types';
import { tokenService } from 'src/services/token/token.service';
import { ITokenService } from 'src/services/token/token.types';

export const useAuthorizationCodeValidatorFactory = (tokenService: ITokenService) => (
  authorizationCode: string,
  onSuccess: (data: IUserTokenState) => void = () => {},
  onError: (error: any) => void = () => {},
): boolean | null => {
  const [isAuthorizationCodeValid, setIsAuthorizationCodeValid] = useState<boolean | null>(null);
  useEffect(
    () => {
      tokenService(authorizationCode)
        .then(data => {
          onSuccess(data);
          setIsAuthorizationCodeValid(true);
        })
        .catch((error) => {
          onError(error);
          setIsAuthorizationCodeValid(false);
        });
    },
    [authorizationCode],
  );
  return isAuthorizationCodeValid;
};

export const useAuthorizationCodeValidator = useAuthorizationCodeValidatorFactory(tokenService);
