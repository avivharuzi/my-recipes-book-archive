import { Router } from 'express';

import { UserController } from './user.controller';

const userRouter = Router();

userRouter.put('/details', UserController.updateDetails());

export { userRouter };
