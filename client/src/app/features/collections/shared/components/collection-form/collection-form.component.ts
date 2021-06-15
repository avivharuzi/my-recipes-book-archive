import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionFormComponent {}
