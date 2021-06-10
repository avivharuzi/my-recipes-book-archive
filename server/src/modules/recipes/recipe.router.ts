import { Router } from 'express';

import { RecipeController } from './recipe.controller';

const recipeRouter = Router();

recipeRouter.post('/', RecipeController.create());

export { recipeRouter };
