import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app.reducer';
import {
  cleanRecipesListAction,
  deleteRecipeFromTheListAction,
  loadRecipesAction,
} from '../../store/recipes.actions';
import { Pagination } from '../../../../shared/shared/pagination';
import { Recipe } from '../../shared/recipe';
import {
  selectIsRecipesListLoading,
  selectRecipesList,
  selectRecipesListLastPagination,
} from '../../store/recipes.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  lastPagination$: Observable<Pagination<Recipe> | null>;
  isListLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.recipes$ = this.store.select(selectRecipesList);
    this.lastPagination$ = this.store.select(selectRecipesListLastPagination);
    this.isListLoading$ = this.store.select(selectIsRecipesListLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(cleanRecipesListAction());
    this.loadRecipes(1);
  }

  loadRecipes(page: number): void {
    this.store.dispatch(loadRecipesAction({ filter: { page } }));
  }

  onDelete(recipe: Recipe): void {
    this.store.dispatch(deleteRecipeFromTheListAction({ recipe }));
  }
}
