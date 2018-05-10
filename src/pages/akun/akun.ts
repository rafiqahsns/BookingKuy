import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoPage } from '../photo/photo';

/**
 * Generated class for the AkunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-akun',
  templateUrl: 'akun.html',
})
export class AkunPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  photo(){
    this.navCtrl.push(PhotoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AkunPage');
  }

}
