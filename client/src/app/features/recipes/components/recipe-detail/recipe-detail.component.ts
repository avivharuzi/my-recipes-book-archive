import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Recipe } from '../../shared/recipe';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  recipe$: Observable<Recipe>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.recipe$ = this.activatedRoute.paramMap.pipe(
      mergeMap(params => this.recipeService.getDetail(params.get('id') || ''))
    );
  }
}
