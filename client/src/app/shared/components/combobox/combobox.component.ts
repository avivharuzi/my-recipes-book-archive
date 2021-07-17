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
  @Input() isLoading: boolean;
  @Output() searchQuery: EventEmitter<string>;
  @Output() itemClick: EventEmitter<ComboboxItem>;

  comboboxInput: Subject<string | null>;

  isOpen: boolean;

  constructor() {
    this.items = [];
    this.isLoading = false;
    this.searchQuery = new EventEmitter<string>();
    this.itemClick = new EventEmitter<ComboboxItem>();
    this.isOpen = false;
    this.comboboxInput = new Subject<string | null>();
  }

  onKeyup(value: string): void {
    this.searchQuery.emit(value || '');
  }

  open(value: string): void {
    this.isOpen = true;
    this.onKeyup(value);
  }

  close(): void {
    this.isOpen = false;
    this.items = [];
  }
}
