import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { User } from '../../../features/auth/shared/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user: User | null;
  @Input() isLoggedIn: boolean;
  @Input() isLoggedOut: boolean;
  @Output() logOut: EventEmitter<void>;

  showMenu: boolean;

  constructor() {
    this.user = null;
    this.isLoggedIn = false;
    this.isLoggedOut = false;
    this.logOut = new EventEmitter<void>();
    this.showMenu = false;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
