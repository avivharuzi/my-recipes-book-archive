import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-collection-new',
  templateUrl: './collection-new.component.html',
  styleUrls: ['./collection-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionNewComponent {}
