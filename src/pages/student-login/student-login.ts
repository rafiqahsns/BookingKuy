import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public type = "password";
  public showPass = false;

  constructor(public navCtrl: NavController, public authService : AuthService, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentLoginPage');
  }
  postRequest(){
    this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result;

      console.log(this.responseData);
      if(this.responseData.error){
          let alert = this.alertCtrl.create({
            title: 'Login Gagal',
            subTitle: 'Username atau password salah.',
            buttons: ['Ok']
          });
        alert.present();
      } else if(this.responseData.userData && this.responseData.userData.tipe == "0"){
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(TabsPage);
      } else if(this.responseData.userData.tipe == "1"){
      let alert = this.alertCtrl.create({
          title: 'Login Gagal',
          subTitle: 'Silahkan gunakan akun mahasiswa.',
          buttons: ['Ok']
        });
      alert.present();
      } else{
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
    this.navCtrl.push(StudentRegisterPage);
  }
  TabsPush(){
    this.navCtrl.setRoot(TabsPage);
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
