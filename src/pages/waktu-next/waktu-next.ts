import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPinjamPage } from '../detail-pinjam/detail-pinjam';

/**
 * Generated class for the WaktuNextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-waktu-next',
  templateUrl: 'waktu-next.html',
})
export class WaktuNextPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaktuNextPage');
  }
  nextdetail(){
    this.navCtrl.push(DetailPinjamPage);
  }
}
