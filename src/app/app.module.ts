import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';

import { AuthService } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BookingPage } from '../pages/booking/booking';
import { HistoryPage } from '../pages/history/history';
import { ChatPage } from '../pages/chat/chat';
import { SettingsPage } from '../pages/settings/settings';
import { StudentLoginPage } from '../pages/student-login/student-login';
import { StudentRegisterPage } from '../pages/student-register/student-register';
import { StaffLoginPage } from '../pages/staff-login/staff-login';
import { StaffTabsPage } from '../pages/staff-tabs/staff-tabs';
import { StaffHistoryPage } from '../pages/staff-history/staff-history';
import { StaffRuanganPage } from '../pages/staff-ruangan/staff-ruangan';
import { StaffSettingPage } from '../pages/staff-setting/staff-setting';
import { StaffChatPage } from '../pages/staff-chat/staff-chat';
import { RuanganNextPage } from '../pages/ruangan-next/ruangan-next';
import { WaktuNextPage } from '../pages/waktu-next/waktu-next';
import { DetailPinjamPage } from '../pages/detail-pinjam/detail-pinjam';
import { PhotoPage } from '../pages/photo/photo';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { EditRuanganPage } from '../pages/edit-ruangan/edit-ruangan';
import { StaffRegisterPage } from '../pages/staff-register/staff-register';
import { StaffTambahRuanganPage } from '../pages/staff-tambah-ruangan/staff-tambah-ruangan';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BookingPage,
    RuanganNextPage,
    HistoryPage,
    HomePage,
    EditRuanganPage,
    ChatPage,
    StudentRegisterPage,
    WaktuNextPage,
    StaffTabsPage,
    StaffLoginPage,
    DetailPinjamPage,
    StaffHistoryPage,
    StudentLoginPage,
    StaffRuanganPage,
    StaffChatPage,
    StaffSettingPage,
    SettingsPage,
    PhotoPage,
    EditRuanganPage,
    StaffRegisterPage,
    StaffTambahRuanganPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BookingPage,
    HistoryPage,
    EditRuanganPage,
    HomePage,
    StudentLoginPage,
    DetailPinjamPage,
    StudentRegisterPage,
    StaffTabsPage,
    WaktuNextPage,
    RuanganNextPage,
    StaffLoginPage,
    StaffHistoryPage,
    StaffRuanganPage,
    StaffChatPage,
    StaffSettingPage,
    ChatPage,
    SettingsPage,
    PhotoPage,
    EditRuanganPage,
    StaffRegisterPage,
    StaffTambahRuanganPage
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,AuthService, Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
