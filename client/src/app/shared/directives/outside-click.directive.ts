import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
})
export class OutsideClickDirective {
  @Output() outsideClick: EventEmitter<MouseEvent>;

  constructor(private elementRef: ElementRef) {
    this.outsideClick = new EventEmitter<MouseEvent>();
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.outsideClick.emit(event);
    }
  }
}
