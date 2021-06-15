import { NgModule } from '@angular/core';

import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeFormComponent } from './shared/components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeNewComponent } from './components/recipe-new/recipe-new.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeNewComponent,
  ],
  imports: [RecipesRoutingModule, SharedModule],
})
export class RecipesModule {}
