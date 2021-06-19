import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Recipe } from '../../recipe';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeItemComponent {
  @Input() recipe?: Recipe;
  @Output() delete: EventEmitter<Recipe>;

  isLoading: boolean;

  constructor(private router: Router, private recipeService: RecipeService) {
    this.delete = new EventEmitter<Recipe>();
    this.isLoading = false;
  }

  onDelete(): void {
    if (!this.recipe) {
      return;
    }
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.isLoading = true;
      this.recipeService
        .delete(this.recipe._id)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => this.delete.emit(this.recipe));
    }
  }

  onEdit(): void {
    this.router.navigate(['/recipes', this.recipe?._id, 'edit']).then();
  }
}
