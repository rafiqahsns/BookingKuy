import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the DetailPinjamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-pinjam',
  templateUrl: 'detail-pinjam.html',
})
export class DetailPinjamPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App,
    private alertCtrl:AlertController, public authService : AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPinjamPage');
  }
  done(){
      let alert = this.alertCtrl.create({
        title: 'Peminjaman berhasil.',
        subTitle: 'Tunggu konfirmasi dari penanggung jawab ruangan.',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.push(TabsPage);
  }
}
