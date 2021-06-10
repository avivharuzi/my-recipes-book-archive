import * as expressAsyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';

import { BadRequest } from '../../errors/bad-request';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { getFilesDataFromUploadedFiles } from '../../utils/get-files-data-from-uploaded-files';
import { RecipeService } from './recipe.service';
import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';
import { validateUploadedFilesImages } from '../../utils/validate-uploaded-files-images';

export class RecipeController {
  static create(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const createRecipeDto = await transformToClassAndValidate<CreateRecipeDto>(
        CreateRecipeDto,
        JSON.parse(req.body?.data)
      );
      if (!req.files?.coverImage) {
        throw new BadRequest('Cover image file is required.');
      }
      validateUploadedFilesImages(req.files.coverImage, 1);
      const coverImageFileData = getFilesDataFromUploadedFiles(
        req.files.coverImage
      )[0];
      const recipe = await RecipeService.create(
        res.locals.user,
        createRecipeDto,
        coverImageFileData
      );
      res.send(recipe);
    });
  }
}
