import { AfterViewInit, Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true,
    },
  ],
})
export class FormTextareaComponent
  implements ControlValueAccessor, AfterViewInit
{
  @Input() id: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() rows: number;
  @Input() describe: string;
  @Input() describedby: string;
  @Input() control: AbstractControl | null;

  value: string;

  constructor() {
    this.id = '';
    this.placeholder = '';
    this.label = '';
    this.rows = 5;
    this.describe = '';
    this.describedby = '';
    this.value = '';
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
