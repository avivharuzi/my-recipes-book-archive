import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { User } from '../../../auth/shared/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user?: User;
  @Output() logOut: EventEmitter<void>;

  showMenu: boolean;

  constructor() {
    this.showMenu = false;
    this.logOut = new EventEmitter<void>();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
