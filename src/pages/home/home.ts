import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentLoginPage } from '../student-login/student-login';
import { StaffLoginPage } from '../staff-login/staff-login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
StudentLoginPush(){
  this.navCtrl.push(StudentLoginPage);
}
StaffLoginPush(){
  this.navCtrl.push(StaffLoginPage);
}

}
