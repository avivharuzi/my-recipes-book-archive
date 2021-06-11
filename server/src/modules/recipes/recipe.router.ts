import { Router } from 'express';

import { RecipeController } from './recipe.controller';

const recipeRouter = Router();

recipeRouter.get('/', RecipeController.index());
recipeRouter.get('/:id', RecipeController.show());
recipeRouter.post('/', RecipeController.create());
recipeRouter.put('/:id', RecipeController.update());
recipeRouter.delete('/:id', RecipeController.delete());

export { recipeRouter };
