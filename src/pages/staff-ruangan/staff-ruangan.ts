import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRuanganPage } from '../edit-ruangan/edit-ruangan';

/**
 * Generated class for the StaffRuanganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-ruangan',
  templateUrl: 'staff-ruangan.html',
})
export class StaffRuanganPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffRuanganPage');
  }
  editt(){
    this.navCtrl.push(EditRuanganPage);
  }
}
