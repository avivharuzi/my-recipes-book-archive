import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-collection-edit',
  templateUrl: './collection-edit.component.html',
  styleUrls: ['./collection-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionEditComponent {}
