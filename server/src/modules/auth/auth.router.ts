import { Router } from 'express';

import { AuthController } from './auth.controller';
import { authenticationMiddleware } from '../../middlewares/authentication.middleware';
import { withoutAuthenticationMiddleware } from '../../middlewares/without-authentication.middleware';

const authRouter = Router();

authRouter.post('/logout', authenticationMiddleware, AuthController.logout());
authRouter.use(withoutAuthenticationMiddleware);
authRouter.post('/sign-up', AuthController.signUp());
authRouter.post('/resend-verification', AuthController.resendVerification());
authRouter.post('/verify/:token', AuthController.verify());
authRouter.post('/forgot-password', AuthController.forgotPassword());
authRouter.post(
  '/check-reset-password/:token',
  AuthController.checkResetPassword()
);
authRouter.post('/reset-password/:token', AuthController.resetPassword());
authRouter.post('/login', AuthController.login());

export { authRouter };
