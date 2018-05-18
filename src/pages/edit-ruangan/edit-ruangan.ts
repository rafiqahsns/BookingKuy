import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { StaffRuanganPage } from '../staff-ruangan/staff-ruangan'
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the EditRuanganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-ruangan',
  templateUrl: 'edit-ruangan.html',
})
export class EditRuanganPage {
  responseData : any;
  ruangan : any;
  constructor(public navCtrl: NavController, public authService:AuthService, public navParams: NavParams
  , private sanitizer: DomSanitizer, public alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('ruanganDetails'));
    this.ruangan = data;
    this.ruangan.picture = this.sanitizer.bypassSecurityTrustUrl(this.ruangan.picture.changingThisBreaksApplicationSecurity)
  }

  save(){
    var send = this.ruangan;
    send.picture = this.ruangan.picture.changingThisBreaksApplicationSecurity;
    this.authService.postData(send,'editRuangan').then((result) => {
     this.responseData = result;
     if(this.responseData.hasil){
     localStorage.setItem('ruanganDetails', JSON.stringify(this.responseData.hasil));
     let alert = this.alertCtrl.create({
       title: 'Perubahan tersimpan',
       buttons: ['Ok']
     });
     alert.present();
     this.navCtrl.push(StaffRuanganPage);
     }
     else{
       let alert = this.alertCtrl.create({
         title: 'Perubahan Gagal',
         subTitle: this.responseData.error,
         buttons: ['Ok']
       });
       alert.present();
     }
   }, (err) => {
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRuanganPage');
  }

}
