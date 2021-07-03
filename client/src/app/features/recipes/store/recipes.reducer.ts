import { createReducer, on } from '@ngrx/store';

import { RecipesState } from './recipes.state';
import {
  addRecipesToTheListAction,
  cleanRecipesListAction,
  deleteRecipeFromTheListAction,
  updateIsListLoadingAction,
} from './recipes.actions';

export const initialState: RecipesState = {
  list: [],
  listLastPagination: null,
  isListLoading: false,
};

export const recipesReducer = createReducer(
  initialState,
  on(addRecipesToTheListAction, (state, { pagination }) => {
    return {
      ...state,
      list: [...state.list, ...pagination.documents],
      listLastPagination: pagination,
    };
  }),
  on(cleanRecipesListAction, state => {
    return {
      ...state,
      list: [],
      listLastPagination: null,
    };
  }),
  on(deleteRecipeFromTheListAction, (state, { recipe }) => {
    const updatedList = state.list.filter(item => item._id !== recipe._id);
    return {
      ...state,
      list: [...updatedList],
    };
  }),
  on(updateIsListLoadingAction, (state, { isLoading }) => {
    return {
      ...state,
      isListLoading: isLoading,
    };
  })
);
