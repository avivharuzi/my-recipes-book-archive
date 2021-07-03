import { Pagination } from 'mongoose-simple-pagination';

import { Collection, CollectionModel } from './collection.model';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { FilterDto } from '../shared/dto/filter.dto';
import { NotFoundError } from '../../errors/not-found-error';
import { RecipeService } from '../recipes/recipe.service';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { UpdateRecipesFromCollectionDto } from './dto/update-recipes-from-collection.dto';
import { User } from '../users/user.model';

export class CollectionService {
  static async getAllByUser(
    user: User,
    filterDto: FilterDto
  ): Promise<Pagination<Collection>> {
    const filter: any = {
      user: user.id,
    };
    if (filterDto.query) {
      filter.name = {
        $regex: '.*' + filterDto.query + '.*',
        $options: 'i',
      };
    }
    return CollectionModel.paginate(filter, {
      page: filterDto.page ? +filterDto.page : 1,
      perPage: 10,
      sort: '-createdAt',
    });
  }

  static async getDetailsByUser(id: string, user: User): Promise<Collection> {
    const collection = await CollectionModel.findOne({
      _id: id,
      user: user.id,
    }).populate('recipes');
    if (!collection) {
      throw new NotFoundError();
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
    const { name, description } = updateCollection;
    const collection = await CollectionModel.findOneAndUpdate(
      {
        _id: id,
        user: user.id,
      },
      {
        name,
        description,
      },
      { new: true }
    ).populate('recipes');
    if (!collection) {
      throw new NotFoundError();
    }
    return collection;
  }

  static async updateRecipesByUser(
    id: string,
    user: User,
    { recipes }: UpdateRecipesFromCollectionDto
  ): Promise<Collection> {
    await RecipeService.validateIsAllBelongToUser(user, recipes);
    const collection = await CollectionModel.findOneAndUpdate(
      {
        _id: id,
        user: user.id,
      },
      {
        $addToSet: { recipes: { $each: recipes } },
      },
      { new: true }
    ).populate('recipes');
    if (!collection) {
      throw new NotFoundError();
    }
    return collection;
  }

  static async deleteRecipesByUser(
    id: string,
    user: User,
    { recipes }: UpdateRecipesFromCollectionDto
  ) {
    await RecipeService.validateIsAllBelongToUser(user, recipes);
    const collection = await CollectionModel.findOneAndUpdate(
      {
        _id: id,
        user: user.id,
      },
      {
        $pull: { recipes: { $in: recipes } },
      },
      { new: true }
    ).populate('recipes');
    if (!collection) {
      throw new NotFoundError();
    }
    return collection;
  }

  static async deleteByUser(id: string, user: User): Promise<Collection> {
    const collection = await CollectionModel.findOneAndDelete({
      _id: id,
      user: user.id,
    });
    if (!collection) {
      throw new NotFoundError();
    }
    return collection;
  }
}
