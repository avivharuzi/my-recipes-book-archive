import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection, CollectionModel } from './collection.model';
import { User } from '../users/user.model';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { NotFound } from '../../errors/not-found';

export class CollectionService {
  static async find(id: string, user: User): Promise<Collection> {
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
    const { name, description } = updateCollection;
    const collection = await CollectionModel.findOne(
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
      throw new NotFound();
    }
    return collection;
  }

  static async delete(id: string, user: User): Promise<Collection> {
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
