import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../../../features/auth/shared/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() user: User | null;
  @Input() isLoggedIn: boolean;
  @Input() isLoggedOut: boolean;
  @Output() logOut: EventEmitter<void>;

  showMenu: boolean;

  routerEventsSubscription?: Subscription;

  constructor(private router: Router) {
    this.user = null;
    this.isLoggedIn = false;
    this.isLoggedOut = false;
    this.logOut = new EventEmitter<void>();
    this.showMenu = false;
  }

  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => (this.showMenu = false));
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
