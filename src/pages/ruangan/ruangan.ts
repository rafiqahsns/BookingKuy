import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { InfoRuanganPage } from '../info-ruangan/info-ruangan';
import { AlertController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
  private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RuanganPage');
  }

  view(item: string){
    this.userData = {"nama": item};
    console.log("Selected Item", item);
    this.authService.postData(this.userData,'item').then((result) => {
      this.responseData = result;

      console.log(this.responseData);
      if(this.responseData.userData){
        localStorage.setItem('userView', JSON.stringify(this.responseData));
        this.navCtrl.push(InfoRuanganPage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Unknown Ruangan',
          buttons: ['Ok']
        });
      alert.present();
      }
    }, (err) => {
      // Error log
    });
  }

}
