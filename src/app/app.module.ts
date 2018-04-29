import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { BookingPage } from '../pages/booking/booking';
import { HistoryPage } from '../pages/history/history';
import { ChatPage } from '../pages/chat/chat';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BookingPage,
    HistoryPage,
    ChatPage,
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
