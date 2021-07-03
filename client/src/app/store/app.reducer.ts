import { ActionReducerMap } from '@ngrx/store';

import { recipesReducer } from '../features/recipes/store/recipes.reducer';
import { RecipesState } from '../features/recipes/store/recipes.state';

export interface AppState {
  recipes: RecipesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: recipesReducer,
};
