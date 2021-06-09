import { Router } from 'express';

import { UserController } from './user.controller';

const userRouter = Router();

userRouter.get('/details', UserController.getDetails());
userRouter.put('/details', UserController.updateDetails());

export { userRouter };
