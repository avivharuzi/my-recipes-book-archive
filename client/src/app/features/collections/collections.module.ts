import { NgModule } from '@angular/core';

import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { CollectionEditComponent } from './components/collection-edit/collection-edit.component';
import { CollectionFormComponent } from './shared/components/collection-form/collection-form.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionNewComponent } from './components/collection-new/collection-new.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CollectionDetailComponent,
    CollectionEditComponent,
    CollectionFormComponent,
    CollectionListComponent,
    CollectionNewComponent,
  ],
  imports: [CollectionsRoutingModule, SharedModule],
})
export class CollectionsModule {}
