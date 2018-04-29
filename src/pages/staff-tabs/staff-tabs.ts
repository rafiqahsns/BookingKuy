import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { StaffHistoryPage } from '../staff-history/staff-history';
import { StaffRuanganPage } from '../staff-ruangan/staff-ruangan';
import { StaffSettingPage } from '../staff-setting/staff-setting';
import { StaffChatPage } from '../staff-chat/staff-chat';

/**
 * Generated class for the StaffTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-tabs',
  templateUrl: 'staff-tabs.html',
})
export class StaffTabsPage {
  staffruanganPage = StaffRuanganPage;
  staffhistoryPage = StaffHistoryPage;
  staffchatPage = StaffChatPage;
  staffsettingPage = StaffSettingPage;
}

