import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDropdownComponent } from './more-dropdown.component';

describe('MoreDropdownComponent', () => {
  let component: MoreDropdownComponent;
  let fixture: ComponentFixture<MoreDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoreDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
