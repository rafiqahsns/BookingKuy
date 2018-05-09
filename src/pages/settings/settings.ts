import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
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
  public userDetails;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App,
    private alertCtrl:AlertController, public authService : AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
   this.userDetails = data.userData;
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
