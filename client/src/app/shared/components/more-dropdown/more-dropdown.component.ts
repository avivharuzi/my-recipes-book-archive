import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-more-dropdown',
  templateUrl: './more-dropdown.component.html',
  styleUrls: ['./more-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreDropdownComponent {
  @Output() edit: EventEmitter<void>;
  @Output() delete: EventEmitter<void>;

  isDropdownMenuOpen: boolean;

  constructor() {
    this.edit = new EventEmitter<void>();
    this.delete = new EventEmitter<void>();
    this.isDropdownMenuOpen = false;
  }

  toggleDropdownMenu(): void {
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
  }

  closeDropdownMenu(): void {
    this.isDropdownMenuOpen = false;
  }
}
