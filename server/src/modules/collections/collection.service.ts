import { BadRequest } from '../../errors/bad-request';
import { Collection, CollectionModel } from './collection.model';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { NotFound } from '../../errors/not-found';
import { RecipeService } from '../recipes/recipe.service';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { User } from '../users/user.model';

export class CollectionService {
  static async getAllByUser(user: User): Promise<Collection[]> {
    return CollectionModel.find({
      user: user.id,
    }).populate('recipes');
  }

  static async getDetailsByUser(id: string, user: User): Promise<Collection> {
    const collection = await CollectionModel.findOne({
      _id: id,
      user: user.id,
    }).populate('recipes');
    if (!collection) {
      throw new NotFound();
    }
    return collection;
  }

  static async create(
    user: User,
    createCollectionDto: CreateCollectionDto
  ): Promise<Collection> {
    const { name, description } = createCollectionDto;
    return CollectionModel.create({
      user: user.id,
      name,
      description,
      recipes: [],
    });
  }

  static async update(
    id: string,
    user: User,
    updateCollection: UpdateCollectionDto
  ): Promise<Collection> {
    const { name, description, recipes } = updateCollection;
    if (!(await RecipeService.isAllBelongToUser(user, recipes))) {
      throw new BadRequest(
        'One of the recipes is not exists or not belong to the current account.'
      );
    }
    const collection = await CollectionModel.findOneAndUpdate(
      {
        _id: id,
        user: user.id,
      },
      {
        name,
        description,
        recipes,
      },
      { new: true }
    ).populate('recipes');
    if (!collection) {
      throw new NotFound();
    }
    return collection;
  }

  static async deleteByUser(id: string, user: User): Promise<Collection> {
    const collection = await CollectionModel.findOneAndDelete({
      _id: id,
      user: user.id,
    });
    if (!collection) {
      throw new NotFound();
    }
    return collection;
  }
}
