import { CreateRecipeDto } from './dto/create-recipe.dto';
import { createSlug } from '../../utils/create-slug';
import { ImageService } from '../images/image.service';
import { NotFound } from '../../errors/not-found';
import { Recipe, RecipeModel } from './recipe.model';
import { RecipeCommonCreateOrUpdateQuery } from './recipe-common-create-or-update-query';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { User } from '../users/user.model';

export class RecipeService {
  static async getAllByUser(user: User): Promise<Recipe[]> {
    return RecipeModel.find({
      user: user.id,
    })
      .populate('coverImage')
      .sort('-createdAt');
  }

  static async getDetailsByUser(id: string, user: User): Promise<Recipe> {
    const recipe = await RecipeModel.findOne({
      _id: id,
      user: user.id,
    }).populate('coverImage');
    if (!recipe) {
      throw new NotFound();
    }
    return recipe;
  }

  static async create(
    user: User,
    createRecipeDto: CreateRecipeDto,
    coverImageFileData: Buffer
  ): Promise<Recipe> {
    const query = RecipeService.getCommonCreateOrUpdateQuery(createRecipeDto);
    const coverImage = await ImageService.saveAndCreate(coverImageFileData);
    query.coverImage = coverImage.id;
    query.user = user.id;
    const recipe = await RecipeModel.create(query);
    return RecipeService.getDetailsByUser(recipe.id, user);
  }

  static async update(
    id: string,
    user: User,
    updateRecipeDto: UpdateRecipeDto,
    coverImageFileData: Buffer | null
  ): Promise<Recipe | null> {
    const query = RecipeService.getCommonCreateOrUpdateQuery(updateRecipeDto);
    const recipe = await RecipeService.getDetailsByUser(id, user);

    if (coverImageFileData !== null) {
      await ImageService.delete(recipe.coverImage.id);
      const coverImage = await ImageService.saveAndCreate(coverImageFileData);
      query.coverImage = coverImage.id;
    }

    return RecipeModel.findOneAndUpdate(
      {
        _id: id,
        user: user.id,
      },
      query,
      {
        new: true,
      }
    ).populate('coverImage');
  }

  static async deleteByUser(id: string, user: User): Promise<Recipe> {
    const recipe = await RecipeModel.findOneAndDelete({
      _id: id,
      user: user.id,
    });
    if (!recipe) {
      throw new NotFound();
    }
    return recipe;
  }

  static async isAllBelongToUser(
    user: User,
    recipeIds: string[]
  ): Promise<boolean> {
    const recipes = await RecipeModel.find({
      _id: { $in: recipeIds },
      user: user.id,
    });
    return recipeIds.length === recipes.length;
  }

  static getCommonCreateOrUpdateQuery(
    recipeDto: CreateRecipeDto | UpdateRecipeDto
  ): RecipeCommonCreateOrUpdateQuery {
    const { title } = recipeDto;
    const slug = createSlug(title);
    return {
      title,
      slug,
      description: recipeDto.description,
      ingredients: recipeDto.ingredients,
      directions: recipeDto.directions,
      preparationTime: recipeDto.preparationTime,
      cookingTime: recipeDto.cookingTime,
      servingsAmount: recipeDto.servingsAmount,
    };
  }
}
