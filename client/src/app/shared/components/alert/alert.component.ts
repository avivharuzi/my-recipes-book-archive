import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Message, MessageType } from '../../shared/message';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() message?: Message | null;
  @Input() isDismissible: boolean;

  MessageType = MessageType;

  constructor() {
    this.isDismissible = true;
  }

  get icon(): string {
    switch (this.message?.type) {
      case MessageType.Success:
        return 'check_circle';
      case MessageType.Error:
        return 'error';
      default:
        return '';
    }
  }
}
