import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StaffTabsPage } from '../staff-tabs/staff-tabs'
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
  public type = "password";
  public showPass = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffLoginPage');
  }

  StaffTabsPush(){
    this.navCtrl.push(StaffTabsPage);
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
