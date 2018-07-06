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
      if(this.responseData.error){
          let alert = this.alertCtrl.create({
            title: 'Login Gagal',
            subTitle: 'Username atau password salah.',
            buttons: ['Ok']
          });
        alert.present();
      } else if(this.responseData.userData && this.responseData.userData.tipe == 1){
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      this.navCtrl.push(StaffTabsPage);
    }
    else if(this.responseData.userData.tipe == 0){
      let alert = this.alertCtrl.create({
        title: 'Login Gagal',
        subTitle: 'Silahkan gunakan akun staff.',
        buttons: ['Ok']
      });
    alert.present();
    }
      else{
        let alert = this.alertCtrl.create({
          title: 'Login Gagal',
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
