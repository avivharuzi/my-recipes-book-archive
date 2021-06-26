import { RequestHandler } from 'express';
import * as expressAsyncHandler from 'express-async-handler';

import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { DeleteRecipesFromCollectionDto } from './dto/delete-recipes-from-collection.dto';
import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { UpdateRecipesFromCollectionDto } from './dto/update-recipes-from-collection.dto';

export class CollectionController {
  static index(): RequestHandler {
    return expressAsyncHandler(async (_req, res) => {
      const collections = await CollectionService.getAllByUser(res.locals.user);
      res.send(collections);
    });
  }

  static show(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const collection = await CollectionService.getDetailsByUser(
        req.params.id,
        res.locals.user
      );
      res.send(collection);
    });
  }

  static create(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const createCollectionDto = await transformToClassAndValidate<CreateCollectionDto>(
        CreateCollectionDto,
        req.body
      );
      const collection = await CollectionService.create(
        res.locals.user,
        createCollectionDto
      );
      res.send(collection);
    });
  }

  static update(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const updateCollectionDto = await transformToClassAndValidate<UpdateCollectionDto>(
        UpdateCollectionDto,
        req.body
      );
      const collection = await CollectionService.update(
        req.params.id,
        res.locals.user,
        updateCollectionDto
      );
      res.send(collection);
    });
  }

  static delete(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const collection = await CollectionService.deleteByUser(
        req.params.id,
        res.locals.user
      );
      res.send(collection);
    });
  }

  static updateRecipes(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const updateRecipesFromCollection = await transformToClassAndValidate<UpdateRecipesFromCollectionDto>(
        UpdateRecipesFromCollectionDto,
        req.body
      );
      const collection = await CollectionService.updateRecipesByUser(
        req.params.id,
        res.locals.user,
        updateRecipesFromCollection
      );
      res.send(collection);
    });
  }

  static deleteRecipes(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const deleteRecipesFromCollectionDto = await transformToClassAndValidate<DeleteRecipesFromCollectionDto>(
        DeleteRecipesFromCollectionDto,
        req.body
      );
      const collection = await CollectionService.deleteRecipesByUser(
        req.params.id,
        res.locals.user,
        deleteRecipesFromCollectionDto
      );
      res.send(collection);
    });
  }
}
