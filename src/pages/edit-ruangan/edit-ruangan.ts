import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
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
  ruangan : any;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , private sanitizer: DomSanitizer) {
    const data = JSON.parse(localStorage.getItem('ruanganDetails'));
    this.ruangan = data;
    this.ruangan.picture = this.sanitizer.bypassSecurityTrustUrl(this.ruangan.picture.changingThisBreaksApplicationSecurity)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRuanganPage');
  }

}
