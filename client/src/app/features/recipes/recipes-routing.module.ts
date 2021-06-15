import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeNewComponent } from './components/recipe-new/recipe-new.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'new', component: RecipeNewComponent },
  { path: ':id', component: RecipeDetailComponent },
  { path: ':id/edit', component: RecipeEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
