import { Router } from 'express';

import { CollectionController } from './collection.controller';

const collectionRouter = Router();

collectionRouter.get('/', CollectionController.index());
collectionRouter.get('/:id', CollectionController.show());
collectionRouter.post('/', CollectionController.create());
collectionRouter.put('/:id', CollectionController.update());
collectionRouter.delete('/:id', CollectionController.delete());
collectionRouter.put('/:id/recipes', CollectionController.updateRecipes());
collectionRouter.delete('/:id/recipes', CollectionController.deleteRecipes());

export { collectionRouter };
