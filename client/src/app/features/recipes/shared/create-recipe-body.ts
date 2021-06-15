export interface CreateRecipeBody {
  title: string;
  slug: string;
  description: string;
  ingredients: string[];
  directions: string[];
  coverImage?: string;
  preparationTime: number;
  cookingTime: number;
  servingsAmount: number;
}
