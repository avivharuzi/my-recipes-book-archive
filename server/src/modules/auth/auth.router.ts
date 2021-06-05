import { Router } from 'express';

import { AuthController } from './auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', AuthController.signUp());

export { authRouter };
