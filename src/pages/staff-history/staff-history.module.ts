import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffHistoryPage } from './staff-history';

@NgModule({
  declarations: [
    StaffHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffHistoryPage),
  ],
})
export class StaffHistoryPageModule {}
