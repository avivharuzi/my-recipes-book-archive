import { createSelector } from '@ngrx/store';

import { AppState } from '../../../store/app.reducer';
import { RecipesState } from './recipes.state';

export const selectRecipes = (state: AppState) => state.recipes;

export const selectRecipesList = createSelector(
  selectRecipes,
  (state: RecipesState) => state.list
);

export const selectRecipesListLastPagination = createSelector(
  selectRecipes,
  (state: RecipesState) => state.listLastPagination
);

export const selectIsRecipesListLoading = createSelector(
  selectRecipes,
  (state: RecipesState) => state.isListLoading
);
