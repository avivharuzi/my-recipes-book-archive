import { NgModule } from '@angular/core';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileFormComponent } from './shared/components/profile-form/profile-form.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, ProfileFormComponent, SettingsComponent],
  imports: [SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
