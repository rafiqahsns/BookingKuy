import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffSettingPage } from './staff-setting';

@NgModule({
  declarations: [
    StaffSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffSettingPage),
  ],
})
export class StaffSettingPageModule {}
