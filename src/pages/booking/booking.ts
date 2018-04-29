import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage {

  constructor(public navCtrl: NavController) {

  }
  ruangan() {
    this.navCtrl.push('RuanganPage');
  }
  waktu() {
    this.navCtrl.push('WaktuPage');
  }
}
