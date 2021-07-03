import { createAction, props } from '@ngrx/store';

import { FilterQueryParams } from '../../../shared/shared/filter-query-params';
import { Pagination } from '../../../shared/shared/pagination';
import { Recipe } from '../shared/recipe';

export const loadRecipesAction = createAction(
  '[Recipes] Load Recipes',
  props<{ filter: FilterQueryParams }>()
);

export const addRecipesToTheListAction = createAction(
  '[Recipes] Add Recipes To The List',
  props<{ pagination: Pagination<Recipe> }>()
);

export const cleanRecipesListAction = createAction(
  '[Recipes] Clean Recipes List'
);

export const deleteRecipeFromTheListAction = createAction(
  '[Recipes] Delete Recipe From The List',
  props<{ recipe: Recipe }>()
);

export const updateIsListLoadingAction = createAction(
  '[Recipes] Update Recipes List Loading',
  props<{ isLoading: boolean }>()
);
