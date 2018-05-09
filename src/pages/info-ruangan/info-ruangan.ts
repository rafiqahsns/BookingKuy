import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { RuanganPage } from '../ruangan/ruangan';

/**
 * Generated class for the InfoRuanganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-ruangan',
  templateUrl: 'info-ruangan.html',
})
export class InfoRuanganPage {
  userDetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const view = JSON.parse(localStorage.getItem('userView'));
    console.log(view);
    this.userDetails = view.userData;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoRuanganPage');
  }

}
