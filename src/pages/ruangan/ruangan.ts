import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WaktuNextPage } from '../waktu-next/waktu-next';
import { AuthService } from '../../providers/auth-service/auth-service';

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
  public viewDetail=false;
  ruanganData: any;
  responseData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
  private alertCtrl: AlertController) {
  }
  nextpage(item: string){
      this.ruanganData = {"nama": item};
      console.log("Selected Item", item);
      this.authService.postData(this.ruanganData,'item').then((result) => {
        this.responseData = result;

        console.log(this.responseData);
        if(this.responseData.userData){
          localStorage.setItem('ruanganDetails', JSON.stringify(this.responseData));
          this.navCtrl.push(WaktuNextPage);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RuanganPage');
  }




}
