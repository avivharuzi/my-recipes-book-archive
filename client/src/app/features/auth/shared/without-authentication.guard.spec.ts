import { TestBed } from '@angular/core/testing';

import { WithoutAuthenticationGuard } from './without-authentication.guard';

describe('WithoutAuthenticationGuard', () => {
  let guard: WithoutAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WithoutAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
