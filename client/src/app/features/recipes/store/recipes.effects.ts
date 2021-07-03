import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.reducer';
import {
  addRecipesToTheListAction,
  loadRecipesAction,
  updateIsListLoadingAction,
} from './recipes.actions';
import { RecipeService } from '../shared/recipe.service';

@Injectable()
export class RecipesEffects {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipesAction),
      tap(() =>
        this.store.dispatch(updateIsListLoadingAction({ isLoading: true }))
      ),
      exhaustMap(action =>
        this.recipe.getList(action.filter).pipe(
          map(pagination => addRecipesToTheListAction({ pagination })),
          finalize(() =>
            this.store.dispatch(updateIsListLoadingAction({ isLoading: false }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recipe: RecipeService,
    private store: Store<AppState>
  ) {}
}
