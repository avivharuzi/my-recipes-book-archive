import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent implements ControlValueAccessor, AfterViewInit {
  @Input() type: string;
  @Input() id: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() describe: string;
  @Input() describedby: string;
  @Input() control: AbstractControl | null;

  value: string;

  constructor() {
    this.type = 'text';
    this.id = '';
    this.placeholder = '';
    this.label = '';
    this.value = '';
    this.describe = '';
    this.describedby = '';
    this.control = null;
  }

  ngAfterViewInit(): void {
    this.value = this.control?.value;
  }

  onChange(_: Event, value: string): void {
    this.value = value;
    this.propagateChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  propagateChange = (_: any): void => {};

  registerOnTouched(_: any): void {}
}
