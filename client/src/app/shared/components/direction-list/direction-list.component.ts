import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-direction-list',
  templateUrl: './direction-list.component.html',
  styleUrls: ['./direction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionListComponent {
  @Input() directions: string[];

  constructor() {
    this.directions = [];
  }
}
