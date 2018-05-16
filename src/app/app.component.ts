import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StaffTabsPage } from '../pages/staff-tabs/staff-tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = '';
  status: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      const data = JSON.parse(localStorage.getItem('userData'));
      console.log(data);
      if(data){
        this.status = data.userData.tipe;
        if(this.status == '0'){
          this.rootPage = TabsPage;
        } else if (this.status == '1'){
          this.rootPage = StaffTabsPage;
        }
      } else{
          this.rootPage = HomePage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
