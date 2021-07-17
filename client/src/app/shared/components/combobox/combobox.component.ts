import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

import { ComboboxItem } from '../../shared/combobox-item';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxComponent {
  @Input() items: ComboboxItem[];
  @Input() placeholder?: string;
  @Output() searchQuery: EventEmitter<string>;
  @Output() itemClick: EventEmitter<ComboboxItem>;

  comboboxInput: Subject<string | null>;

  isOpen: boolean;

  constructor() {
    this.items = [];
    this.searchQuery = new EventEmitter<string>();
    this.itemClick = new EventEmitter<ComboboxItem>();
    this.isOpen = false;
    this.comboboxInput = new Subject<string | null>();
  }

  onKeyup(event: Event): void {
    const value = (<HTMLInputElement>event.target).value;
    this.searchQuery.emit(value);
  }

  open(): void {
    this.isOpen = true;
    this.searchQuery.emit('');
  }

  close(): void {
    this.isOpen = false;
  }
}
