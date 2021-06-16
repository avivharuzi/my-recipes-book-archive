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

  MessageType = MessageType;
}
