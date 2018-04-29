import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentLoginPage } from './student-login';

@NgModule({
  declarations: [
    StudentLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentLoginPage),
  ],
})
export class StudentLoginPageModule {}
