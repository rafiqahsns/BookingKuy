import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = '';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      const data = localStorage.getItem('userData');
      if(data){
        this.rootPage = TabsPage;
      } else{
        this.rootPage = HomePage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
