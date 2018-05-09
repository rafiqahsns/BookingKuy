import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPinjamPage } from '../detail-pinjam/detail-pinjam';

/**
 * Generated class for the RuanganNextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruangan-next',
  templateUrl: 'ruangan-next.html',
})
export class RuanganNextPage {
  items = [
    'RK U 2.01',
    'RK U 2.02',
    'RK U 3.03'
  ];
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RuanganNextPage');
  }
  nextdetail(){
    this.navCtrl.push(DetailPinjamPage);
  }
}
