import { Component } from '@angular/core';
import {  NavController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StudentLoginPage } from '../student-login/student-login';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-student-register',
  templateUrl: 'student-register.html',
})
export class StudentRegisterPage {
  responseData : any;
  userData = {"username": "","password": "", "name": "","email": ""};
  public type = 'password';
  public showPass = false;

  constructor(public navCtrl: NavController, public authService:AuthService, private alertCtrl: AlertController ) {
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
      this.navCtrl.push(StudentLoginPage);
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
