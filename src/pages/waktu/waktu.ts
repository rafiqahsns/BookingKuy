import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RuanganNextPage } from '../ruangan-next/ruangan-next';

/**
 * Generated class for the WaktuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-waktu',
  templateUrl: 'waktu.html',
})
export class WaktuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaktuPage');
  }
  nextpage(){
    this.navCtrl.push(RuanganNextPage);
  }
}
