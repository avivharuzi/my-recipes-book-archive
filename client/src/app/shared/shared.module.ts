import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultImageDirective } from './directives/default-image.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { ImagePipe } from './pipes/image.pipe';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormInputErrorComponent } from './components/form-input-error/form-input-error.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    DefaultImageDirective,
    NavbarComponent,
    LogoComponent,
    UserDropdownComponent,
    OutsideClickDirective,
    ImagePipe,
    FormInputComponent,
    FormInputErrorComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    DefaultImageDirective,
    NavbarComponent,
    FormInputComponent,
    FormInputErrorComponent,
  ],
})
export class SharedModule {}
