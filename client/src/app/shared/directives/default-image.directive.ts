import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

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

  private readonly defaultImage = 'assets/images/defaults/default-image.png';

  constructor() {
    this.appDefaultImage = this.defaultImage;
  }

  ngOnInit(): void {
    if (!this.appDefaultImage) {
      this.appDefaultImage = this.defaultImage;
    }
  }
}
