import { RequestHandler } from 'express';
import * as expressAsyncHandler from 'express-async-handler';

import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';
import { UpdateCollectionDto } from './dto/update-collection.dto';

export class CollectionController {
  static create(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const createCollectionDto = await transformToClassAndValidate<CreateCollectionDto>(
        CreateCollectionDto,
        req.body
      );
      const collection = await CollectionService.create(
        res.locals.user,
        createCollectionDto,
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

  static show(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const collection = await CollectionService.find(
        req.params.id,
        res.locals.user
      );
      res.send(collection);
    });
  }

  static delete(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const collection = await CollectionService.delete(
        req.params.id,
        res.locals.user
      );
      res.send(collection);
    });
  }
}
