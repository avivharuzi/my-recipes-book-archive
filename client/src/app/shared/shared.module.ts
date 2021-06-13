import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { DefaultImageDirective } from './directives/default-image.directive';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormInputErrorComponent } from './components/form-input-error/form-input-error.component';
import { ImagePipe } from './pipes/image.pipe';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DefaultImageDirective,
    FormInputComponent,
    FormInputErrorComponent,
    ImagePipe,
    LogoComponent,
    NavbarComponent,
    OutsideClickDirective,
    UserDropdownComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    DefaultImageDirective,
    FormInputComponent,
    FormInputErrorComponent,
    NavbarComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
