import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  notif(){
    this.navCtrl.push('NotifikasiPage');
  }
  akun(){
    this.navCtrl.push('AkunPage');
  }
  logout(){
    let alert = this.alertCtrl.create({
      title: 'Logout Successful',
      buttons: ['Ok']
    });
    alert.present();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }
}
