import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-input-error',
  templateUrl: './form-input-error.component.html',
  styleUrls: ['./form-input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputErrorComponent implements AfterContentChecked {
  @Input() isMulti: boolean;
  @Input() control: AbstractControl | null;

  errors: string[];

  constructor() {
    this.isMulti = false;
    this.control = null;
    this.errors = [];
  }

  ngAfterContentChecked(): void {
    this.reset();

    if (!this.control) {
      return;
    }
    if (!this.control.dirty || !this.control.invalid || !this.control.errors) {
      return;
    }

    for (const key in this.control.errors) {
      if (!this.control.errors.hasOwnProperty(key)) {
        continue;
      }
      const error = this.control.errors[key];
      if (error && typeof error === 'string') {
        this.errors.push(error);
        if (!this.isMulti) {
          break;
        }
      }
    }
  }

  private reset(): void {
    this.errors = [];
  }
}
