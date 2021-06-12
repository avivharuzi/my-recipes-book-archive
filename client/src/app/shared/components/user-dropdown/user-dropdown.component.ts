import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent {
  @Input() profileImg: string;
  @Input() userName: string;
  @Output() logOut: EventEmitter<void>;

  isDropdownMenuOpen: boolean;

  constructor() {
    this.profileImg = '';
    this.userName = '';
    this.logOut = new EventEmitter<void>();
    this.isDropdownMenuOpen = false;
  }

  toggleDropdownMenu(): void {
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
  }
}
