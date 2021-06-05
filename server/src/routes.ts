import { Application } from 'express';

import { authRouter } from './modules/auth/auth.router';

export const routes = async (app: Application): Promise<void> => {
  app.use('/auth', authRouter);
};
