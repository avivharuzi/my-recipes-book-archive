import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    let domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafeUrlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
