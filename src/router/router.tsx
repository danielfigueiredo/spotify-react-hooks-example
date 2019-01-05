import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { HomeRouter } from './home';
import { LoginRouter } from './login';
import { SummaryRouter } from './summary/summary.router';


// TODO investigate this weird issue that we need a wrapping div here
// the Switch component didn't work, swallowing other routes
export const Router = () => (
  <BrowserRouter>
    <div>
      <HomeRouter />
      <LoginRouter />
      <SummaryRouter />
    </div>
  </BrowserRouter>
);
