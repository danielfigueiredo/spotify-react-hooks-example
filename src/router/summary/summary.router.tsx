import React from 'react';
import { Route } from 'react-router-dom';

import { SummaryRoutes } from './summary.types';

import { Dashboard } from './dashboard/dashboard.route';

export const SummaryRouter = () => (
  <>
    <Route exact path={SummaryRoutes.DASHBOARD} component={Dashboard} />
  </>
);
