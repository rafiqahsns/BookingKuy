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
     this.userDetails = this.data;
     //console.log(this.userDetails.userData);
     this.userDetails.userData.profilpic = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+this.userDetails.userData.profilpic);
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
    //console.log('Userdetails:');
    //console.log(this.userDetails.profilpic.changingThisBreaksApplicationSecurity);
    this.userDetails.userData.profilpic = this.userDetails.userData.profilpic.changingThisBreaksApplicationSecurity;
    this.userDetails.userData.profilpic = this.userDetails.userData.profilpic.replace('data:image/png;base64','');
    //localStorage.setItem('userData', JSON.stringify(this.userDetails));
    //console.log(this.userDetails);
    this.authService.postData(this.userDetails.userData,'getImages').then((result) => {
      this.responseData = result;
      //console.log(this.responseData);
      if(this.responseData.userData){
          this.userDetails.userData.profilpic = this.responseData.userData.profilpic;
            //console.log(this.responseData);
            localStorage.setItem('userData', JSON.stringify(this.userDetails));
            console.log(this.userDetails);
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
            subTitle: 'Silakan tunggu sesaat.',
            buttons: [{
            text: 'Ok',
            handler: () => {
              let navTransition = alert.dismiss();
              navTransition.then(() => {
                  window.location.reload();
              });
            }
            }],
            enableBackdropDismiss: false
    });
    alert.present();

  }
}
