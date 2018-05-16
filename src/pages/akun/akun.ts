import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { TabsPage } from '../tabs/tabs';
import { PhotoPage } from '../photo/photo';
import { DomSanitizer } from '@angular/platform-browser';

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
  public userDetails;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App,
    private alertCtrl:AlertController, private sanitizer: DomSanitizer) {
      const data = JSON.parse(localStorage.getItem('userData'));
     this.userDetails = data.userData;
     this.userDetails.profilpic = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+this.userDetails.profilpic);
  }
  public showPass = false;
  public type = 'password';

  photo(){
    this.navCtrl.push(PhotoPage);
  }

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
