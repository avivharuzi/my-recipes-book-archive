import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message } from '../../../../shared/shared/message';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeNewComponent {
  message$: Subject<Message>;
  isLoading: boolean;

  constructor(private recipeService: RecipeService, private router: Router) {
    this.message$ = new Subject<Message>();
    this.isLoading = false;
  }

  onFormSubmit(formData: FormData) {
    this.isLoading = true;
    this.recipeService
      .create(formData)
      .pipe(
        errorMessageOperator(message => this.message$.next(message)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(recipe => {
        this.router.navigate([`/recipes/${recipe._id}`]).then();
      });
  }
}
