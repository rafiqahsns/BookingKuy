import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StaffLoginPage } from '../staff-login/staff-login';
/**
 * Generated class for the StaffRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-register',
  templateUrl: 'staff-register.html',
})
export class StaffRegisterPage {

  responseData : any;
  userData = {"username": "","password": "", "name": "","email": "", "tipe":1, "kontak":"" };
  public type = 'password';
  public showPass = false;

  constructor(public navCtrl: NavController, public authService:AuthService, private alertCtrl: AlertController ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffRegisterPage');
  }

  signup(){
     this.authService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      if(this.responseData.userData){
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      let alert = this.alertCtrl.create({
        title: 'Registrasi Berhasil',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.push(StaffLoginPage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Registrasi Gagal',
          subTitle: 'Username sudah ada!',
          buttons: ['Ok']
        });
        alert.present();
      }
    }, (err) => {
      // Error log
    });

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
