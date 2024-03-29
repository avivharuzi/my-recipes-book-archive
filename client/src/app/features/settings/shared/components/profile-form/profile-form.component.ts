import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CustomValidators } from '../../../../../shared/shared/custom-validators';
import { getCommonImageValidators } from '../../../../../shared/shared/get-common-image-validators';
import { markAllAsDirty } from '../../../../../shared/shared/mark-all-as-dirty';
import { User } from '../../../../auth/shared/user';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent implements OnInit {
  @Input() user!: User;
  @Output() formSubmit: EventEmitter<FormData>;

  profileForm: FormGroup;
  profileImagePreview: string | null;

  constructor(private formBuilder: FormBuilder) {
    this.formSubmit = new EventEmitter<FormData>();
    this.profileForm = formBuilder.group({
      firstName: [
        '',
        [CustomValidators.required, CustomValidators.maxLength(64)],
      ],
      lastName: [
        '',
        [CustomValidators.required, CustomValidators.maxLength(64)],
      ],
      profileImage: [[], [...getCommonImageValidators()]],
    });
    this.profileImagePreview = null;
  }

  ngOnInit(): void {
    this.fillProfileForm();
    this.profileImageFormControl.valueChanges.subscribe(value => {
      if (value && value.length > 0 && this.profileImageFormControl.valid) {
        this.profileImagePreview = URL.createObjectURL(value[0]);
      } else {
        this.profileImagePreview = null;
      }
    });
  }

  get profileImageFormControl(): FormControl {
    return this.profileForm.get('profileImage') as FormControl;
  }

  onSubmit(): void {
    markAllAsDirty(Object.values(this.profileForm));
    if (this.profileForm.invalid) {
      return;
    }

    const formData = new FormData();
    const profileFormValue = this.profileForm.value;
    if (
      profileFormValue.profileImage &&
      profileFormValue.profileImage.length > 0
    ) {
      formData.set('profileImage', profileFormValue.profileImage[0]);
    }
    delete profileFormValue.profileImage;
    formData.set('data', JSON.stringify(profileFormValue));

    this.formSubmit.emit(formData);
  }

  private fillProfileForm() {
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    });
  }
}
