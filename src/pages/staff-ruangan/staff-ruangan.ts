import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DomSanitizer } from '@angular/platform-browser';
import { EditRuanganPage } from '../edit-ruangan/edit-ruangan'
import { StaffTambahRuanganPage } from '../staff-tambah-ruangan/staff-tambah-ruangan'
/**
 * Generated class for the StaffRuanganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-ruangan',
  templateUrl: 'staff-ruangan.html',
})
export class StaffRuanganPage {
  ruangan : any =  [''];
  ruanganData : any;
  responseData : any;
  userData = {"penjaga": ""};
  userDetails: any;
  result: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , private authService: AuthService, private sanitizer: DomSanitizer, public alertCtrl: AlertController) {
  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;
  this.userData.penjaga = this.userDetails.user_id;

  this.authService.postData(this.userData,'ruangan').then((result) => {
  this.responseData = result;
  console.log('masuk')
  if(this.responseData.hasil){
    console.log(this.responseData);
    var i;
    for(i=0 ; i < this.responseData.hasil.length; i++){
      this.ruangan[i] = this.responseData.hasil[i];
      this.ruangan[i].picture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+this.ruangan[i].picture);
    }
  }
  }, (err) => {
    // Error log
  });
}
  editt(list){
    this.ruanganData = list;
    localStorage.setItem('ruanganDetails', JSON.stringify(this.ruanganData));
    this.navCtrl.push(EditRuanganPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffRuanganPage');
  }
  tambah(){
    this.navCtrl.push(StaffTambahRuanganPage);
  }
  }
