import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentRegisterPage } from './student-register';

@NgModule({
  declarations: [
    StudentRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentRegisterPage),
  ],
})
export class StudentRegisterPageModule {}
