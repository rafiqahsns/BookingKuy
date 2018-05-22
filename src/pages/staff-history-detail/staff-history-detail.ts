import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StaffHistoryPage } from '../staff-history/staff-history';
/**
 * Generated class for the StaffHistoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-history-detail',
  templateUrl: 'staff-history-detail.html',
})
export class StaffHistoryDetailPage {
  pinjamDetails : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer,
  public alertCtrl: AlertController,public authService:AuthService) {
    const pinjam = JSON.parse(localStorage.getItem('pinjamDetails'));
    this.pinjamDetails = pinjam;
    this.pinjamDetails.picture = this.sanitizer.bypassSecurityTrustUrl(this.pinjamDetails.picture.changingThisBreaksApplicationSecurity);
  }
  confirm(){
    console.log(this.pinjamDetails.history_date);
    let confirm = this.alertCtrl.create({
      title: "Konfirmasi?",
      message: "",
      buttons: [
        {
          text: "Tidak"
        },
        {
          text: "Ya",
          handler: () => {
            this.authService.postData(this.pinjamDetails.history_date, "historyAcc");
                let done = this.alertCtrl.create({
                  title: "Permintaan dikonfirmasi.",
                  buttons: ["Ok"]
                });
                done.present();
                this.navCtrl.setRoot(StaffHistoryPage);
          }
        }
      ]
    });
    confirm.present();
  }
  ignore(){
    console.log(this.pinjamDetails.history_date);
    let confirm = this.alertCtrl.create({
      title: "Abaikan permintaan?",
      message: "",
      buttons: [
        {
          text: "Tidak"
        },
        {
          text: "Ya",
          handler: () => {
            this.authService.postData(this.pinjamDetails.history_date, "historyDel");
                let done = this.alertCtrl.create({
                  title: "Permintaan diabaikan.",
                  buttons: ["Ok"]
                });
                done.present();
                this.navCtrl.setRoot(StaffHistoryPage);
          }
        }
      ]
    });
    confirm.present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffHistoryDetailPage');
  }

}
