import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ButtonType } from '../../shared/button-type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: ButtonType;
  @Input() isFullRounded: boolean;
  @Input() icon?: string;

  constructor() {
    this.type = 'primary';
    this.isFullRounded = false;
  }
}
