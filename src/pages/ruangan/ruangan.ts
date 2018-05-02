import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RuanganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruangan',
  templateUrl: 'ruangan.html',
})
export class RuanganPage {
  items = [
    'RK U 2.01',
    'RK U 2.02',
    'RK U 3.01'
  ];

  faperta = [
    'RK PINUS 1',
    'RK PINUS 2',
    'RK 16 FAC 401 D'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RuanganPage');
  }
 
}
