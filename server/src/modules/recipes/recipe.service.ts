import { NotFound } from '../../errors/not-found';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { createSlug } from '../../utils/create-slug';
import { ImageService } from '../images/image.service';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeModel } from './recipe.model';
import { User } from '../users/user.model';
import { BadRequest } from '../../errors/bad-request';

export class RecipeService {
  static async create(
    user: User,
    createRecipeDto: CreateRecipeDto,
    coverImageFileData: Buffer
  ): Promise<Recipe> {
    const query = RecipeService.getCommonCreateOrUpdateQuery(createRecipeDto);
    query.coverImage = (
      await ImageService.saveAndCreate(coverImageFileData)
    ).id;
    query.user = user.id;
    return RecipeModel.create(query);
  }

  static async update(
    id: string,
    user: User,
    updateRecipeDto: UpdateRecipeDto,
    coverImageFileData: Buffer | null
  ): Promise<Recipe | null> {
    const query = RecipeService.getCommonCreateOrUpdateQuery(updateRecipeDto);

    const recipe = await RecipeService.findByUser(id, user);

    if (coverImageFileData !== null) {
      await ImageService.delete(recipe.coverImage.id);
      query.coverImage = (
        await ImageService.saveAndCreate(coverImageFileData)
      ).id;
    }

    return RecipeModel.findOneAndUpdate(
      {
        id,
        user: user.id,
      },
      query,
      {
        new: true,
      }
    ).populate('coverImage');
  }

  static async findByUser(id: string, user: User): Promise<Recipe> {
    const recipe = await RecipeModel.findOne({
      _id: id,
      user: user.id,
    }).populate('coverImage');
    if (!recipe) {
      throw new NotFound();
    }
    return recipe;
  }

  static async deleteByUser(id: string, user: User): Promise<Recipe> {
    const recipe = await RecipeModel.findOneAndDelete({
      _id: id,
      user: user.id,
    });
    if (!recipe) {
      throw new BadRequest();
    }
    return recipe;
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

interface RecipeCommonCreateOrUpdateQuery {
  user?: string;
  title: string;
  slug: string;
  description: string;
  ingredients: string[];
  directions: string[];
  preparationTime: number;
  cookingTime: number;
  servingsAmount: number;
  coverImage?: string;
}
