import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckListComponent {
  @Input() checks: string[];

  constructor() {
    this.checks = [];
  }
}
