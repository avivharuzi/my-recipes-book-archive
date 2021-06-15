import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { CollectionEditComponent } from './components/collection-edit/collection-edit.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionNewComponent } from './components/collection-new/collection-new.component';

const routes: Routes = [
  { path: '', component: CollectionListComponent },
  { path: 'new', component: CollectionNewComponent },
  { path: ':id', component: CollectionDetailComponent },
  { path: ':id/edit', component: CollectionEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
