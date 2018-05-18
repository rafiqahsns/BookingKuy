import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WaktuNextPage } from '../waktu-next/waktu-next';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DomSanitizer } from '@angular/platform-browser';
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
  search = '';
  fmipa : any;
  faperta : any;
  public viewDetail=false;
  ruanganData: any;
  responseData: any;
  responseData2: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,
  private alertCtrl: AlertController, private sanitizer: DomSanitizer) {
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
  this.initializeItems();
  var val = ev.target.value;
  this.search = val.toLowerCase();
  console.log(this.search);
}
  matchesSearch(s){
    var i;
    s = s.toLowerCase();
    for(i=0; i < this.search.length; i++){
      if(s[i] != this.search[i]) return false;
    }
    return true;
  }

  nextpage(item: string){
      this.ruanganData = item;
      console.log("Selected Item", item);
      this.authService.postData(this.ruanganData,'item').then((result) => {
        this.responseData = result;
        this.authService.postData(this.responseData.userData.nama, "ruanganImage").then(
          (res) => {
            this.responseData2 = res;
            this.responseData.userData.picture = this.responseData2.image.picture;
            if(this.responseData.userData){
              localStorage.setItem('ruanganDetails', JSON.stringify(this.responseData));
              this.navCtrl.push(WaktuNextPage);
            }
          },
          err => {
              console.log('error fetching image');
            }
          );

        if(this.responseData.userData){
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
