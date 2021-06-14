import * as expressAsyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';

import { getFilesDataFromUploadedFiles } from '../../utils/get-files-data-from-uploaded-files';
import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { validateUploadedFilesImages } from '../../utils/validate-uploaded-files-images';

export class UserController {
  static updateDetails(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const updateUserDto = await transformToClassAndValidate<UpdateUserDto>(
        UpdateUserDto,
        JSON.parse(req.body?.data)
      );

      let profileImage = null;
      if (req.files && req.files.profileImage) {
        validateUploadedFilesImages(req.files.profileImage, 1);
        profileImage = getFilesDataFromUploadedFiles(req.files.profileImage)[0];
      } else if (updateUserDto.profileImage) {
        profileImage = updateUserDto.profileImage;
      }

      const userPublicDetails = await UserService.updateDetails(
        res.locals.user,
        updateUserDto,
        profileImage
      );
      res.send(userPublicDetails);
    });
  }
}
