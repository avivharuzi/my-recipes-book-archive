import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

import { environment } from '../../../environments/environment';

@Directive({
  selector: '[appDefaultImage]',
})
export class DefaultImageDirective implements OnInit {
  @Input() appDefaultImage: string;

  @HostBinding('src')
  @Input()
  src?: string;

  @HostListener('error')
  onError(): void {
    this.src = this.appDefaultImage;
  }

  constructor() {
    this.appDefaultImage = environment.defaultImagePath;
  }

  ngOnInit(): void {
    if (!this.appDefaultImage) {
      this.appDefaultImage = environment.defaultImagePath;
    }
  }
}
