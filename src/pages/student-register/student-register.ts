import { Component } from '@angular/core';
import {  NavController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StudentLoginPage } from '../student-login/student-login';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-student-register',
  templateUrl: 'student-register.html',
})
export class StudentRegisterPage {
  responseData : any;
  userData = {"username": "","password": "", "name": "","email": ""};

  constructor(public navCtrl: NavController, public authService:AuthService ) {
  }

  signup(){
     this.authService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      if(this.responseData.userData){
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      this.navCtrl.push(TabsPage);
      }
      else{ console.log("User already exists"); }
    }, (err) => {
      // Error log
    });

  }

  login(){
    //Login page link
    this.navCtrl.push(StudentLoginPage);
  }
}
