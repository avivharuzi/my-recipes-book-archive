import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { OutsideClickDirective } from './outside-click.directive';

describe('OutsideClickDirective', () => {
  it('should create an instance', () => {
    let elementRef = TestBed.inject(ElementRef);
    const directive = new OutsideClickDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
