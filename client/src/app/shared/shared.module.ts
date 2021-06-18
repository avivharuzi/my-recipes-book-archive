import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { ContainerComponent } from './components/container/container.component';
import { DefaultImageDirective } from './directives/default-image.directive';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormInputErrorComponent } from './components/form-input-error/form-input-error.component';
import { FormInputFileComponent } from './components/form-input-file/form-input-file.component';
import { ImagePipe } from './pipes/image.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
    ContainerComponent,
    DefaultImageDirective,
    FormInputComponent,
    FormInputErrorComponent,
    FormInputFileComponent,
    ImagePipe,
    LoaderComponent,
    LogoComponent,
    NavbarComponent,
    OutsideClickDirective,
    UserDropdownComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    AlertComponent,
    ButtonComponent,
    CommonModule,
    ContainerComponent,
    DefaultImageDirective,
    FormInputComponent,
    FormInputErrorComponent,
    FormInputFileComponent,
    ImagePipe,
    LoaderComponent,
    LogoComponent,
    NavbarComponent,
    OutsideClickDirective,
    ReactiveFormsModule,
    RouterModule,
    UserDropdownComponent,
  ],
})
export class SharedModule {}
