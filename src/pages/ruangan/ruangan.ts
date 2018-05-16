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
  fmipa : any;
  faperta : any;
  public viewDetail=false;
  ruanganData: any;
  responseData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
  private alertCtrl: AlertController) {
    this.initializeItems();
  }

  initializeItems(){
    this.authService.postData("FMIPA", "listRuangan").then(
      result => {
        this.responseData = result;
        this.fmipa = this.responseData.hasil;
        console.log('hasil :');
        console.log(this.responseData);
        console.log(this.fmipa);
      },
      err => {
        console.log('error fetching FMIPA');
      }
    );
    this.authService.postData("FAPERTA", "listRuangan").then(
      result => {
        this.responseData = result;
        this.faperta = this.responseData.hasil;
        console.log('hasil :');
        console.log(this.responseData);
        console.log(this.faperta);
      },
      err => {
        console.log('error fetching FAPERTA');
      }
    );
  }

  onInput(ev) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the ev target
  var val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.fmipa = this.fmipa.filter((item) => {
      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
  if (val && val.trim() != '') {
    this.faperta = this.faperta.filter((item) => {
      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}

  nextpage(item: string){
      this.ruanganData = item;
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
