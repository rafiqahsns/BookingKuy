import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StudentRegisterPage } from '../student-register/student-register';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the StudentLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-login',
  templateUrl: 'student-login.html',
})
export class StudentLoginPage {
  responseData : any;
  userData = {"username": "","password": ""};

  constructor(public navCtrl: NavController, public authService : AuthService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentLoginPage');
  }
  postRequest(){
    this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result;

      console.log(this.responseData);
      if(this.responseData.userData){
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(TabsPage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Login Failed',
          subTitle: 'Wrong username or password.',
          buttons: ['Ok']
        });
      alert.present();
      }
    }, (err) => {
      // Error log
    });
  }
  register(){
    this.navCtrl.push(StudentRegisterPage);
  }
  TabsPush(){
    this.navCtrl.push(TabsPage);
  }


}
