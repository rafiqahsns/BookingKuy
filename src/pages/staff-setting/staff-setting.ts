import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the StaffSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-setting',
  templateUrl: 'staff-setting.html',
})
export class StaffSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffSettingPage');
  }

  logout(){
    localStorage.clear();
    console.log(localStorage); //checking if the data is gone after logout
    let alert = this.alertCtrl.create({
      title: 'Logout Successful',
      buttons: ['Ok']
    });
    alert.present();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

}
