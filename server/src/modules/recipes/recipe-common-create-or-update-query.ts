export interface RecipeCommonCreateOrUpdateQuery {
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
