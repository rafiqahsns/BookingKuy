import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { StaffRuanganPage } from '../staff-ruangan/staff-ruangan'
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
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
  responseData : any;
  ruangan : any;
  ori : any;
  show = false;
  constructor(public navCtrl: NavController, public authService:AuthService, public navParams: NavParams
  , private sanitizer: DomSanitizer, public alertCtrl: AlertController, private camera: Camera) {
    const data = JSON.parse(localStorage.getItem('ruanganDetails'));
    this.ruangan = data;
    this.ruangan.picture = this.sanitizer.bypassSecurityTrustUrl(this.ruangan.picture.changingThisBreaksApplicationSecurity)
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
    send.picture = this.ruangan.picture.changingThisBreaksApplicationSecurity;
    send.picture = send.picture.slice(22,send.picture.length);
    this.authService.postData(send,'editRuangan').then((result) => {
     this.responseData = result;
     if(this.responseData.hasil){
     localStorage.setItem('ruanganDetails', JSON.stringify(this.responseData.hasil));
     let alert = this.alertCtrl.create({
       title: 'Perubahan tersimpan',
       buttons: ['Ok']
     });
     alert.present();
     this.navCtrl.push(StaffRuanganPage);
     }
     else{
       let alert = this.alertCtrl.create({
         title: 'Perubahan Gagal',
         subTitle: this.responseData.error,
         buttons: ['Ok']
       });
       alert.present();
     }
   }, (err) => {
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRuanganPage');
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
        this.ruangan.picture = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+imageData);
        this.show = true;
      },
      err => {
        console.log(err);
      }
    );
  }


}
