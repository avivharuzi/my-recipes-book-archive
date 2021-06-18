import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() isLoading: boolean;
  @Input() size: number;
  @Input() imgSrc: string;

  constructor() {
    this.isLoading = false;
    this.size = 100;
    this.imgSrc = 'assets/images/defaults/default-loader.gif';
  }
}
