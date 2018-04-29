import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffChatPage } from './staff-chat';

@NgModule({
  declarations: [
    StaffChatPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffChatPage),
  ],
})
export class StaffChatPageModule {}
