import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { TabsPage } from '../tabs/tabs';
import { PhotoPage } from '../photo/photo';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../providers/auth-service/auth-service';

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
  data : any;
  responseData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App,
    private alertCtrl:AlertController, private sanitizer: DomSanitizer, public authService : AuthService) {
    this.data = JSON.parse(localStorage.getItem('userData'));
     this.userDetails = this.data.userData;
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
    console.log('Userdetails:');
    console.log(this.userDetails);
    this.authService.postData(this.userDetails,'getImages').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.imageData){
        this.data.userData.profilpic = this.responseData.imageData.profilpic;
        localStorage.setItem('userData', JSON.stringify(this.data.userData));
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'error .',
          buttons: ['Ok']
        });
      alert.present();
      }
    }, (err) => {
      // Error log
    });
    let alert = this.alertCtrl.create({

            title: 'Berhasil disimpan',
            buttons: ['Ok']
          });
          alert.present();
          this.navCtrl.setRoot(SettingsPage);
  }
}
