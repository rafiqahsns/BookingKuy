import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffHistoryDetailPage } from './staff-history-detail';

@NgModule({
  declarations: [
    StaffHistoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffHistoryDetailPage),
  ],
})
export class StaffHistoryDetailPageModule {}
