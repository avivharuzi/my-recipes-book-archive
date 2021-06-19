import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize, mergeMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message, SuccessMessage } from '../../../../shared/shared/message';
import { Recipe } from '../../shared/recipe';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent {
  recipe$: Observable<Recipe>;
  message$: Subject<Message>;
  isLoading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.recipe$ = this.activatedRoute.paramMap.pipe(
      mergeMap(params => this.recipeService.getDetail(params.get('id') || ''))
    );
    this.message$ = new Subject<Message>();
    this.isLoading = false;
  }

  onFormSubmit(id: string, formData: FormData) {
    this.isLoading = true;
    this.recipeService
      .update(id, formData)
      .pipe(
        errorMessageOperator(message => this.message$.next(message)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.message$.next(new SuccessMessage('Recipe updated successfully.'));
      });
  }
}
