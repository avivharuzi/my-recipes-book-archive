import { Recipe } from '../shared/recipe';
import { Pagination } from '../../../shared/shared/pagination';

export interface RecipesState {
  list: Recipe[];
  listLastPagination: Pagination<Recipe> | null;
  isListLoading: boolean;
}
