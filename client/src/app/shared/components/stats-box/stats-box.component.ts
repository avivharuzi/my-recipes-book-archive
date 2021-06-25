import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-box',
  templateUrl: './stats-box.component.html',
  styleUrls: ['./stats-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsBoxComponent {
  @Input() icon?: string;
}
