import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffRegisterPage } from './staff-register';

@NgModule({
  declarations: [
    StaffRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffRegisterPage),
  ],
})
export class StaffRegisterPageModule {}
