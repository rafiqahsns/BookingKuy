import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRuanganPage } from '../edit-ruangan/edit-ruangan';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
  ruangan = [''];
  responseData : any;
  userData = {"penjaga": ""};
  userDetails: any;
  result: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , private authService: AuthService, private sanitizer: DomSanitizer) {
  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;
  this.userData.penjaga = this.userDetails.name;

  this.authService.postData(this.userData,'ruangan').then((result) => {
  this.responseData = result;
  console.log('masuk')
  if(this.responseData.hasil){
    console.log(this.responseData);
    var i;
    for(i=0 ; i < this.responseData.hasil.length; i++){
      this.ruangan[i] = this.responseData.hasil[i];
      this.ruangan[i].picture =
        this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+this.ruangan[i].picture);
    }
  }
  }, (err) => {
    // Error log
  }); 
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffRuanganPage');
  }
  editt(){
    this.navCtrl.push(EditRuanganPage);
  }
}
