import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AkunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-akun',
  templateUrl: 'akun.html',
})
export class AkunPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App,
    private alertCtrl:AlertController) {
  }
  public showPass = false;
  public type = 'password';
  ionViewDidLoad() {
    console.log('ionViewDidLoad AkunPage');
  }
  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  saved(){
    let alert = this.alertCtrl.create({
            title: 'Berhasil disimpan',
            buttons: ['Ok']
          });
          alert.present();
          this.navCtrl.setRoot(SettingsPage);
  }
}
