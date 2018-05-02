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

  constructor(public navCtrl: NavController, public authService:AuthService, private alertCtrl: AlertController ) {
  }

  signup(){
     this.authService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      if(this.responseData.userData){
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      let alert = this.alertCtrl.create({
        title: 'Register Successful',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.push(StudentLoginPage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Register Failed',
          subTitle: 'Username already exist!',
          buttons: ['Ok']
        });
        alert.present();
      }
    }, (err) => {
      // Error log
    });

  }

  login(){
    //Login page link
    this.navCtrl.push(StudentLoginPage);
  }
}
