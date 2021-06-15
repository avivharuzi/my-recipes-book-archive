import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CreateRecipeBody } from '../../create-recipe-body';
import { CustomValidators } from '../../../../../shared/shared/custom-validators';
import { getCommonImageValidators } from '../../../../../shared/shared/get-common-image-validators';
import { markAllAsDirty } from '../../../../../shared/shared/mark-all-as-dirty';
import { Recipe } from '../../recipe';
import { UpdateRecipeBody } from '../../update-recipe-body';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe?: Recipe;
  @Output() formSubmit: EventEmitter<FormData>;

  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formSubmit = new EventEmitter<FormData>();
    this.recipeForm = this.formBuilder.group({
      title: ['', [CustomValidators.required, CustomValidators.maxLength(128)]],
      description: [
        '',
        [CustomValidators.required, CustomValidators.maxLength(255)],
      ],
      ingredients: ['', [CustomValidators.required]],
      directions: ['', [CustomValidators.required]],
      coverImage: [
        [],
        [CustomValidators.required, ...getCommonImageValidators()],
      ],
      preparationTime: [
        '',
        [CustomValidators.required, CustomValidators.min(0)],
      ],
      cookingTime: ['', [CustomValidators.required, CustomValidators.min(0)]],
      servingsAmount: [
        '',
        [CustomValidators.required, CustomValidators.min(0)],
      ],
    });
  }

  ngOnInit(): void {
    this.fillRecipeForm();
  }

  onSubmit(): void {
    markAllAsDirty(Object.values(this.recipeForm.controls));
    if (this.recipeForm.invalid) {
      return;
    }

    const recipeFormValue = this.recipeForm.value;
    recipeFormValue.ingredients = recipeFormValue.ingredients.splice(/\r?\n/);
    recipeFormValue.directions = recipeFormValue.directions.splice(/\r?\n/);
    const body: CreateRecipeBody | UpdateRecipeBody = recipeFormValue;
    const coverImage = body.coverImage;
    delete body.coverImage;

    const formData = new FormData();
    formData.set('data', JSON.stringify(body));
    if (coverImage && coverImage.length > 0) {
      formData.set('coverImage', coverImage[0]);
    }
    this.formSubmit.emit(formData);
  }

  private fillRecipeForm(): void {
    if (!this.recipe) {
      return;
    }
    this.recipeForm.setValue({
      title: this.recipe.title,
      description: this.recipe.description,
      ingredients: this.recipe.ingredients.join('\r\n'),
      directions: this.recipe.directions.join('\r\n'),
      preparationTime: this.recipe.preparationTime,
      cookingTime: this.recipe.cookingTime,
      servingsAmount: this.recipe.servingsAmount,
    });
    this.recipeForm
      .get('coverImage')
      ?.setValidators([...getCommonImageValidators()]);
  }
}