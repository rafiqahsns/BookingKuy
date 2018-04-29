import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BookingPage } from '../pages/booking/booking';
import { HistoryPage } from '../pages/history/history';
import { ChatPage } from '../pages/chat/chat';
import { SettingsPage } from '../pages/settings/settings';
import { StudentLoginPage } from '../pages/student-login/student-login';
import { StaffLoginPage } from '../pages/staff-login/staff-login';
import { StaffTabsPage } from '../pages/staff-tabs/staff-tabs';
import { StaffHistoryPage } from '../pages/staff-history/staff-history';
import { StaffRuanganPage } from '../pages/staff-ruangan/staff-ruangan';
import { StaffSettingPage } from '../pages/staff-setting/staff-setting';
import { StaffChatPage } from '../pages/staff-chat/staff-chat';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BookingPage,
    HistoryPage,
    HomePage,
    ChatPage,
    StudentLoginPage,
    StaffTabsPage,
    StaffLoginPage,
    StaffHistoryPage,
    StaffRuanganPage,
    StaffChatPage,
    StaffSettingPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BookingPage,
    HistoryPage,
    HomePage,
    StudentLoginPage,
    StaffTabsPage,
    StaffLoginPage,
    StaffHistoryPage,
    StaffRuanganPage,
    StaffChatPage,
    StaffSettingPage,
    ChatPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
