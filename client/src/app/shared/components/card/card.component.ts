import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() link!: string | string[];
  @Input() imgSrc!: string;
  @Input() title!: string;
  @Input() description?: string;

  @Output() edit: EventEmitter<void>;
  @Output() delete: EventEmitter<void>;

  isDropdownMenuOpen = false;

  constructor() {
    this.edit = new EventEmitter<void>();
    this.delete = new EventEmitter<void>();
  }
}
