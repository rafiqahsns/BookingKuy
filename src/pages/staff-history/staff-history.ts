import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the StaffHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-history',
  templateUrl: 'staff-history.html',
})
export class StaffHistoryPage {
  userData = {"penjaga": ""};
  userDetails: any;
  arr = ['']
  responseData : any;
  result: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userData.penjaga = this.userDetails.name;

    this.authService.postData(this.userData,'history').then((result) => {
    this.responseData = result;
    if(this.responseData.hasil){
      console.log(this.responseData)
      var i;
      for(i=0 ; i < this.responseData.hasil.length; i++){
        this.arr[i] = this.responseData.hasil[i];
        if(this.arr[i].status == "0"){
          this.arr[i].status = "Menunggu konfirmasi.";
        }else{ this.arr[i].status = "Ruangan telah dikonfirmasi.";}
      }
    }
    }, (err) => {
      // Error log
    });
    console.log(this.history);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffHistoryPage');
  }
  refresh(){
    this.history = [''];
    this.ruangan = [''];
    this.authService.postData(this.userData,'history').then((result) => {
    this.responseData = result;
    if(this.responseData.hasil){
      console.log(this.responseData)
      var i;
      for(i=0 ; i < this.responseData.hasil.length; i++){
        if(this.responseData.hasil[i].status == '0'){
          this.history[i] = 'Menunggu konfirmasi';
        } else{
          this.history[i] = 'Ruangan telah dikonfirmasi';
        }
        this.ruangan[i] = this.responseData.hasil[i].ruangan;
      }
    }
    }, (err) => {
      // Error log
    });
  }

}
