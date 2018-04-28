import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { HomePage } from '../home/home';
import { BookingPage } from '../booking/booking';
import { HistoryPage } from '../history/history';
import { ChatPage } from '../chat/chat';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  homePage = HomePage;
  bookingPage = BookingPage;
  historyPage = HistoryPage;
  chatPage = ChatPage;
  settingsPage = SettingsPage;
}
