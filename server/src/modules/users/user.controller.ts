import * as expressAsyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';

import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

export class UserController {
  static getDetails(): RequestHandler {
    return expressAsyncHandler(async (_req, res) => {
      const userPublicDetails = UserService.getPublicDetails(res.locals.user);
      res.send(userPublicDetails);
    });
  }

  static updateDetails(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const updateUserDto = await transformToClassAndValidate<UpdateUserDto>(
        UpdateUserDto,
        req.body
      );

      const userPublicDetails = await UserService.updateDetails(
        res.locals.user,
        updateUserDto
      );
      res.send(userPublicDetails);
    });
  }
}
