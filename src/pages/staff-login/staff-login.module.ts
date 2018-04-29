import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffLoginPage } from './staff-login';

@NgModule({
  declarations: [
    StaffLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffLoginPage),
  ],
})
export class StaffLoginPageModule {}
