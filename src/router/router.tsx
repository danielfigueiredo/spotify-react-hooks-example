import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LoginRouter } from './login';

export const Router = () => (
  <BrowserRouter>
    <LoginRouter />
  </BrowserRouter>
);
