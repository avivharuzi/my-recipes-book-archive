import * as expressAsyncHandler from 'express-async-handler';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';

export class AuthController {
  static signUp() {
    return expressAsyncHandler(async (req, res) => {
      const createUserDto = await transformToClassAndValidate<CreateUserDto>(
        CreateUserDto,
        req.body
      );
      await AuthService.signUp(createUserDto);
      return res.send();
    });
  }
}
