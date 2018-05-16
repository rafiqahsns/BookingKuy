import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StaffTabsPage } from '../staff-tabs/staff-tabs';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { StaffRegisterPage } from '../staff-register/staff-register';
/**
 * Generated class for the StaffLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-login',
  templateUrl: 'staff-login.html',
})
export class StaffLoginPage {
  responseData : any;
  userData = {"username": "","password": ""};
  public type = "password";
  public showPass = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthService,
  private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffLoginPage');
  }

  StaffTabsPush(){
    this.authService.postData(this.userData,'login').then((result) => {
    this.responseData = result;
    if(this.responseData.userData){
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      this.navCtrl.push(StaffTabsPage);
    }
      else{
        let alert = this.alertCtrl.create({
          title: 'LoginGagal',
          subTitle: 'Username atau password salah.',
          buttons: ['Ok']
        });
      alert.present();
      }
    }, (err) => {
      // Error log
    });
  }
  register(){
    this.navCtrl.push(StaffRegisterPage);
  }

  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
