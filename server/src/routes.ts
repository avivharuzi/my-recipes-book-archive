import { Application } from 'express';

import { authenticationMiddleware } from './middlewares/authentication.middleware';
import { authRouter } from './modules/auth/auth.router';
import { collectionRouter } from './modules/collections/collection.router';
import { recipeRouter } from './modules/recipes/recipe.router';
import { userRouter } from './modules/users/user.router';

export const routes = async (app: Application): Promise<void> => {
  app.use('/auth', authRouter);
  app.use('/user', authenticationMiddleware, userRouter);
  app.use('/recipes', authenticationMiddleware, recipeRouter);
  app.use('/collections', authenticationMiddleware, collectionRouter);
};
