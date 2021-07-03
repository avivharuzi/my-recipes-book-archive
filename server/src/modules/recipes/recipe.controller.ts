import * as expressAsyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../errors/bad-request-error';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FilterDto } from '../shared/dto/filter.dto';
import { getFilesDataFromUploadedFiles } from '../../utils/get-files-data-from-uploaded-files';
import { RecipeService } from './recipe.service';
import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { validateUploadedFilesImages } from '../../utils/validate-uploaded-files-images';

export class RecipeController {
  static index(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const filterDto = await transformToClassAndValidate<FilterDto>(
        FilterDto,
        req.query
      );
      const recipes = await RecipeService.getAllByUser(
        res.locals.user,
        filterDto
      );
      res.send(recipes);
    });
  }

  static show(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const recipe = await RecipeService.getDetailsByUser(
        req.params.id,
        res.locals.user
      );
      res.send(recipe);
    });
  }

  static create(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const createRecipeDto = await transformToClassAndValidate<CreateRecipeDto>(
        CreateRecipeDto,
        JSON.parse(req.body?.data)
      );

      if (!req.files?.coverImage) {
        throw new BadRequestError('Cover image file is required.');
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

  static update(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const updateRecipeDto = await transformToClassAndValidate<UpdateRecipeDto>(
        UpdateRecipeDto,
        JSON.parse(req.body?.data)
      );

      let coverImageFileData = null;
      if (req.files?.coverImage) {
        validateUploadedFilesImages(req.files.coverImage, 1);
        coverImageFileData = getFilesDataFromUploadedFiles(
          req.files.coverImage
        )[0];
      }

      const recipe = await RecipeService.update(
        req.params.id,
        res.locals.user,
        updateRecipeDto,
        coverImageFileData
      );
      res.send(recipe);
    });
  }

  static delete(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const recipe = await RecipeService.deleteByUser(
        req.params.id,
        res.locals.user
      );
      res.send(recipe);
    });
  }
}
