import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddItemComponent } from './components/add-item/add-item.component';
import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CheckListComponent } from './components/check-list/check-list.component';
import { ContainerComponent } from './components/container/container.component';
import { DefaultImageDirective } from './directives/default-image.directive';
import { DirectionListComponent } from './components/direction-list/direction-list.component';
import { FilterEmptyPipe } from './pipes/filter-empty.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormInputErrorComponent } from './components/form-input-error/form-input-error.component';
import { FormInputFileComponent } from './components/form-input-file/form-input-file.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { ImagePipe } from './pipes/image.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { ModalComponent } from './components/modal/modal.component';
import { MoreDropdownComponent } from './components/more-dropdown/more-dropdown.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { StatsBoxComponent } from './components/stats-box/stats-box.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';

@NgModule({
  declarations: [
    AddItemComponent,
    AlertComponent,
    ButtonComponent,
    CardComponent,
    CheckListComponent,
    ContainerComponent,
    DefaultImageDirective,
    DirectionListComponent,
    FilterEmptyPipe,
    FooterComponent,
    FormInputComponent,
    FormInputErrorComponent,
    FormInputFileComponent,
    FormTextareaComponent,
    ImagePipe,
    LoaderComponent,
    LogoComponent,
    ModalComponent,
    MoreDropdownComponent,
    NavbarComponent,
    OutsideClickDirective,
    SafeUrlPipe,
    StatsBoxComponent,
    UserDropdownComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    AddItemComponent,
    AlertComponent,
    ButtonComponent,
    CardComponent,
    CheckListComponent,
    CommonModule,
    ContainerComponent,
    DefaultImageDirective,
    DirectionListComponent,
    FilterEmptyPipe,
    FooterComponent,
    FormInputComponent,
    FormInputErrorComponent,
    FormInputFileComponent,
    FormTextareaComponent,
    ImagePipe,
    LoaderComponent,
    LogoComponent,
    ModalComponent,
    MoreDropdownComponent,
    NavbarComponent,
    OutsideClickDirective,
    ReactiveFormsModule,
    RouterModule,
    SafeUrlPipe,
    StatsBoxComponent,
    UserDropdownComponent,
  ],
})
export class SharedModule {}
