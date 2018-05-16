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
  jam:any;
  asal:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.asal="false";
   this.jam = [
    '15.00-16.00',
    '16.00-17.00',
    '17.00-18.00',
    '18.00-19.00',
    '19.00-20.00',
    '20.00-21.00'
  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaktuPage');
  }
  nextpage(){
    this.navCtrl.push(RuanganNextPage);
  }
}
