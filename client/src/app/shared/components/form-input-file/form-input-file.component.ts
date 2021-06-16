import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-input-file',
  templateUrl: './form-input-file.component.html',
  styleUrls: ['./form-input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputFileComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputFileComponent implements ControlValueAccessor, OnInit {
  @Input() multiple: boolean;
  @Input() control: AbstractControl | null;

  label: string;
  value: File[];

  constructor() {
    this.multiple = false;
    this.control = null;
    this.label = 'Choose file';
    this.value = [];
  }

  ngOnInit(): void {
    this.updateLabel();
  }

  onFileChange(event: Event): void {
    const fileList: FileList = (event.target as HTMLInputElement)
      .files as FileList;
    if (!fileList || fileList.length === 0) {
      this.onChange(event, []);
      return;
    }

    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i) as File);
    }
    this.onChange(event, files);
  }

  onChange(_: Event, value: File[]): void {
    this.value = value;
    this.propagateChange(this.value);
    this.updateLabel(value);
  }

  writeValue(value: File[]): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  propagateChange = (_: any): void => {};

  registerOnTouched(_: any): void {}

  private updateLabel(files: File[] = []): void {
    if (files.length > 1) {
      this.label = `${files.length} files`;
    } else if (files.length === 1) {
      this.label = files[0].name;
    } else {
      this.label = `Choose ${this.multiple ? 'files' : 'file'}`;
    }
  }
}
