import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { Recipe } from '../../shared/recipe';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.recipes = [];
  }

  ngOnInit(): void {
    this.recipeService.getList().subscribe(recipes => {
      this.recipes = recipes.documents;
      this.changeDetectorRef.detectChanges();
    });
  }

  onDelete(recipe: Recipe): void {
    const recipes = this.recipes;
    const recipeIndex = recipes.indexOf(recipe);
    if (recipeIndex === -1) {
      return;
    }
    recipes.splice(recipeIndex, 1);
    this.recipes = [...recipes];
    this.changeDetectorRef.detectChanges();
  }
}
