import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteComponent {
  @Input() subject!: string;
  @Output() cancel: EventEmitter<void>;
  @Output() delete: EventEmitter<void>;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    _event: KeyboardEvent
  ) {
    this.cancel.emit();
  }

  constructor() {
    this.cancel = new EventEmitter<void>();
    this.delete = new EventEmitter<void>();
  }
}
