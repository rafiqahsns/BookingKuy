import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from "../../providers/auth-service/auth-service";
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the DetailPinjamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-pinjam',
  templateUrl: 'detail-pinjam.html',
})
export class DetailPinjamPage {
  ruanganDetails: any;
  pinjamDate: any;
  pinjamTime: any;
  harga: number = 0;
  responseData : any;
  userDetails: any;
  pinjamData = {"ruangan": "","date": "","time": "","penyewa": "", "penjaga":"","alasan":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl:App,
    private alertCtrl:AlertController, public authService: AuthService, private sanitizer: DomSanitizer) {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      const ruangan = JSON.parse(localStorage.getItem('ruanganDetails'));
      console.log(ruangan);
      console.log('^ ruangan');
      const pinjam = JSON.parse(localStorage.getItem('pinjamDetails'));
      //console.log(ruangan);
      //console.log(pinjam);
      this.ruanganDetails = ruangan.userData;
      this.ruanganDetails.picture = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this.ruanganDetails.picture);
      console.log('var');
      console.log(this.ruanganDetails);
      this.pinjamDate = pinjam.date;
      this.pinjamTime = pinjam.time;
      var i;
      for(i=0; i<this.pinjamTime.length; i++ ){
        if(this.pinjamTime[i]!=null){
          this.harga += Number(this.ruanganDetails.harga);
        }
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPinjamPage');
  }
  done(){
    this.pinjamData.ruangan = this.ruanganDetails.id_ruangan;
    this.pinjamData.date = this.pinjamDate;
    this.pinjamData.penyewa = this.userDetails.user_id;
    this.pinjamData.penjaga = this.ruanganDetails.penjaga;
    var i;
    var check=0;
    for(i=0; i< this.pinjamTime.length;i++){
        if(this.pinjamTime[i]!=null){
            this.pinjamData.time = this.pinjamTime[i];
            this.authService.postData(this.pinjamData, "pinjam").then(
              (result) => {
                this.responseData = result;
                console.log(this.responseData);
                if(!this.responseData.hasil){
                    let alert = this.alertCtrl.create({
                      title: 'Peminjaman gagal.',
                      subTitle: 'Ada ruangan yang tidak tersedia.',
                      buttons: ['Ok']
                    });
                    alert.present();
                    check = 1;
                    this.navCtrl.push(TabsPage);
                }
              },
              (err) => {
                // Error log
              }
            );
          }
      }
      if(check==0){
          let alert = this.alertCtrl.create({
            title: 'Peminjaman berhasil.',
            subTitle: 'Tunggu konfirmasi dari penanggung jawab ruangan.',
            buttons: ['Ok']
          });
          alert.present();
          this.navCtrl.push(TabsPage);
      }
  }
}
