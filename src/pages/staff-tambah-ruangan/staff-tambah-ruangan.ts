import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { StaffRuanganPage } from '../staff-ruangan/staff-ruangan'
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
/**
 * Generated class for the StaffTambahRuanganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-tambah-ruangan',
  templateUrl: 'staff-tambah-ruangan.html',
})
export class StaffTambahRuanganPage {
  responseData : any;
  ruangan :any;
  ori = {};
  show = false;
  constructor(public navCtrl: NavController, public authService:AuthService, public navParams: NavParams
  , private sanitizer: DomSanitizer, public alertCtrl: AlertController, private camera: Camera) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.ruangan = {"nama": "","deskripsi": "", "harga": 0.0,"fakultas": "","penjaga": data.userData.user_id
      ,"picture": this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,') };
    this.ori = this.ruangan.picture;
  }
  batal(){
    let confirm = this.alertCtrl.create({
      title: "Ubah foto ke semula?",
      message: "",
      buttons: [
        {
          text: "Tidak"
        },
        {
          text: "Ya",
          handler: () => {
            this.ruangan.picture = this.ori;
            this.show = false;
          }
        }
      ]
    });
    confirm.present();
  }
  save(){
    var send = this.ruangan;
    send.picture = send.picture.changingThisBreaksApplicationSecurity.slice(22,send.picture.length);
    this.authService.postData(send,'tambahRuangan').then((result) => {
     this.responseData = result;
     if(this.responseData.hasil){
     localStorage.setItem('ruanganDetails', JSON.stringify(this.responseData.hasil));
     let alert = this.alertCtrl.create({
       title: 'Ruangan Berhasil Ditambahkan.',
       buttons: ['Ok']
     });
     alert.present();
     this.navCtrl.push(StaffRuanganPage);
     }
     else{
       let alert = this.alertCtrl.create({
         title: 'Ruangan Berhasil Ditambahkan.',
         subTitle: this.responseData.error,
         buttons: ['Ok']
       });
       alert.present();
     }
   }, (err) => {
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TambahRuanganPage');
  }

  browsePhoto() {
    console.log("Browsing Photo");

    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        var pic = 'data:image/jpg;base64,'+imageData;
        if(pic.slice(22,27) != 'iVBOR' && pic.slice(22,27) != '/9j/4'){
          console.log('slice:');
          console.log(pic.slice(22,27));
          let alert = this.alertCtrl.create({
            title: 'Gagal!',
            subTitle:'Mohon masukan gambar berformat PNG atau JPG',
            buttons: [{
              text: "Ok",
              handler: () => {
                this.ruangan.picture = this.ori;
                this.show = false;
              }
            }]
          });
          alert.present();
          return;
        }
        this.ruangan.picture = this.sanitizer.bypassSecurityTrustUrl(pic);
        this.show = true;
      },
      err => {
        console.log(err);
      }
    );
  }
  test(){
    console.log(this.ruangan);
  }

}
