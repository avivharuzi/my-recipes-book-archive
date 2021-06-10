import { CreateRecipeDto } from './dto/create-recipe.dto';
import { createSlug } from '../../utils/create-slug';
import { ImageService } from '../images/image.service';
import { Recipe, RecipeModel } from './recipe.model';
import { User } from '../users/user.model';

export class RecipeService {
  static async create(
    user: User,
    createRecipeDto: CreateRecipeDto,
    coverImageFileData: Buffer
  ): Promise<Recipe> {
    const { title } = createRecipeDto;
    const slug = createSlug(title)
    const coverImage = await ImageService.saveAndCreate(coverImageFileData);
    return RecipeModel.create({
      user: user.id,
      title,
      slug,
      description: createRecipeDto.description,
      ingredients: createRecipeDto.ingredients,
      directions: createRecipeDto.directions,
      coverImage,
      preparationTime: createRecipeDto.preparationTime,
      cookingTime: createRecipeDto.cookingTime,
      servingsAmount: createRecipeDto.servingsAmount,
    });
  }
}
