import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import moment from 'moment';

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
  log = [];
  responseData : any;
  result: any;
  dateNow: any;
  datePinjam: any;
  timeNow: any;
  timePinjam: any;
  timeSelesai: any;
  Temp: any;
  //day: any;
  date: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userData.penjaga = this.userDetails.name;
    //this.date = moment().format('YYYY-MM-DD HH:mm:ss');
    //this.date = moment(this.date).format('dddd');
    //this.time = Number(moment().format('HHmmss'));
    //console.log(this.date);
    //console.log(this.time);
    this.authService.postData(this.userData,'history').then((result) => {
    this.responseData = result;
    if(this.responseData.hasil){
      console.log(this.responseData);

      var i;
      for(i=0 ; i < this.responseData.hasil.length; i++){
        this.log[i] = this.responseData.hasil[i];
        this.log[i].show = true;
        this.Temp = this.log[i].history_date.split(" ");
        //this.day = moment(this.log[i].history_date).format("dddd");
        this.date = this.Temp[0].split("-");
        //console.log(this.Temp[0]);
        //console.log(this.date);
        //console.log(this.time);
        this.log[i].history_date = this.date[2] + "-" + this.date[1] + "-" + this.date[0] + " " + this.Temp[1];
        //console.log(this.day);

        this.Temp = this.log[i].tanggal.split("-").join();
        this.datePinjam = Number(this.Temp.replace(/\,/g,''));

        this.Temp = this.log[i].waktu.split("-").join();
        this.timePinjam = this.Temp[0].split(":").join();
        this.timeSelesai = this.Temp[1].split(":").join();
        this.timePinjam += ",00";
        this.timeSelesai += ",00";
        this.timePinjam = Number(this.timePinjam.replace(/\,/g, ''));
        this.timeSelesai = Number(this.timeSelesai.replace(/\,/g, ''));

        this.dateNow = Number(moment().format('YYYYMMDD'));
        if(this.dateNow > this.datePinjam){
            if(this.log[i].status == "0"){
              this.log[i].status = "Ruangan tidak dikonfirmasi, permintaan dibatalkan";
            } else{
              this.log[i].status = "Peminjaman ruangan telah berakhir";
            }

        } else if (this.dateNow == this.datePinjam){
            this.timeNow = Number(moment().format('HHmmss'));
            if(this.timeNow >= this.timePinjam && this.timeNow <= this.timeSelesai){
                if(this.log[i].status == "0"){
                  this.log[i].status = "Ruangan tidak dikonfirmasi, permintaan dibatalkan";
                } else{
                  this.log[i].status = "Ruangan sedang dipakai";
                }
            } else if (this.timeNow < this.timePinjam){
              if(this.log[i].status == "0"){
                this.log[i].status = "Menunggu konfirmasi";
              } else{
                this.log[i].status = "Ruangan telah dikonfirmasi";
              }
            } else if( this.timeNow > this.timeSelesai){
                if(this.log[i].status == "0"){
                  this.log[i].status = "Ruangan tidak dikonfirmasi, permintaan dibatalkan";
                } else{
                  this.log[i].status = "Peminjaman ruangan telah berakhir";
                }
            }
        } else{
          if(this.log[i].status == "0"){
            this.log[i].status = "Menunggu konfirmasi";
          } else{
            this.log[i].status = "Ruangan telah dikonfirmasi";
          }
        }
    }
  }
    }, (err) => {
      // Error log
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffHistoryPage');
  }
  expand(list){
    console.log(list);
    if(list.show == true){
      list.show = false;
    }else{ list.show = true;}
  }
  refresh(){
    this.authService.postData(this.userData,'history').then((result) => {
    this.responseData = result;
    if(this.responseData.hasil){
      console.log(this.responseData);
      this.log = [];
      var i;
      for(i=0 ; i < this.responseData.hasil.length; i++){
        this.log[i] = this.responseData.hasil[i];

        this.Temp = this.log[i].history_date.split(" ");
        //this.day = moment(this.log[i].history_date).format("dddd");
        this.date = this.Temp[0].split("-");
        //this.time = this.Temp[1];
        //console.log(this.day);
        //console.log(this.date);
        //console.log(this.time);
        this.log[i].history_date = this.date[2] + "-" + this.date[1] + "-" + this.date[0] + " " + this.Temp[1];

        this.Temp = this.log[i].tanggal.split("-").join();
        this.datePinjam = Number(this.Temp.replace(/\,/g,''));

        this.Temp = this.log[i].waktu.split("-").join();
        this.timePinjam = this.Temp[0].split(":").join();
        this.timeSelesai = this.Temp[1].split(":").join();
        this.timePinjam += ",00";
        this.timeSelesai += ",00";
        this.timePinjam = Number(this.timePinjam.replace(/\,/g, ''));
        this.timeSelesai = Number(this.timeSelesai.replace(/\,/g, ''));

        this.dateNow = Number(moment().format('YYYYMMDD'));
        if(this.dateNow > this.datePinjam){
            if(this.log[i].status == "0"){
              this.log[i].status = "Ruangan tidak dikonfirmasi, permintaan dibatalkan";
            } else{
              this.log[i].status = "Peminjaman ruangan telah berakhir";
            }

        } else if (this.dateNow == this.datePinjam){
            this.timeNow = Number(moment().format('HHmmss'));
            if(this.timeNow >= this.timePinjam && this.timeNow <= this.timeSelesai){
                if(this.log[i].status == "0"){
                  this.log[i].status = "Ruangan tidak dikonfirmasi, permintaan dibatalkan";
                } else{
                  this.log[i].status = "Ruangan sedang dipakai";
                }
            } else if (this.timeNow < this.timePinjam){
              if(this.log[i].status == "0"){
                this.log[i].status = "Menunggu konfirmasi";
              } else{
                this.log[i].status = "Ruangan telah dikonfirmasi";
              }
            } else if( this.timeNow > this.timeSelesai){
                if(this.log[i].status == "0"){
                  this.log[i].status = "Ruangan tidak dikonfirmasi, permintaan dibatalkan";
                } else{
                  this.log[i].status = "Peminjaman ruangan telah berakhir";
                }
            }
        } else{
          if(this.log[i].status == "0"){
            this.log[i].status = "Menunggu konfirmasi";
          } else{
            this.log[i].status = "Ruangan telah dikonfirmasi";
          }
        }
    }
  }
    }, (err) => {
      // Error log
    });
  }

}
