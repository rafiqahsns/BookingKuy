import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPinjamPage } from '../detail-pinjam/detail-pinjam';

/**
 * Generated class for the WaktuNextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-waktu-next',
  templateUrl: 'waktu-next.html',
})
export class WaktuNextPage {
  time = [false, false, false];
  timeDetails = ['14.00-15.00', '16.00-17.00', '21.00-22.00'];
  timeFix = [null,null,null];
  date: any;
  detailPinjam = {"date": '', "time": null};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaktuNextPage');
  }
  nextdetail(){
    var i;
    for(i=0; i < this.time.length; i++){
      if(this.time[i]){
        this.timeFix[i] = this.timeDetails[i];
      }
    }
    this.detailPinjam = {"date": this.date, "time": this.timeFix};
    //console.log(this.detailPinjam);
    localStorage.setItem('pinjamDetails', JSON.stringify(this.detailPinjam));
    this.navCtrl.push(DetailPinjamPage);
  }
  updatetime(){
    //console.log(this.time);
  }
  updatedate(){
    //console.log(this.date);
  }
}
