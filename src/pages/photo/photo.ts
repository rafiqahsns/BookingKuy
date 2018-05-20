import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AuthService } from "../../providers/auth-service/auth-service";
// import {
//   FileTransfer,
//   FileUploadOptions,
//   FileTransferObject
// } from "@ionic-native/file-transfer";
// import { File } from "@ionic-native/file";
@Component({
  selector: "page-photo",
  templateUrl: "photo.html"
})
export class PhotoPage {
  ori : any;
  public photos: any;
  public base64Image: string;
  public fileImage: string;
  public responseData: any;
  private userDetails: any;
  userData = { user_id: "", token: "", imageB64: "" };
  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController,
    public authService: AuthService
    //private transfer: FileTransfer, private file: File, private fileUploadOptions: FileUploadOptions
  ) {
 const data = JSON.parse(localStorage.getItem('userData'));
 this.userDetails = data.userData;

}
  //const fileTransfer = this.transfer.create();
  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Yakin ingin menghapus foto?",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Agree clicked");
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }

  takePhoto() {
    console.log("Taking Photo");

    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.sendData(imageData);
      },
      err => {
        console.log(err);
      }
    );
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
            buttons: ["OK"]
          });
          alert.present();
          return;
        }
        this.base64Image = pic;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.sendData(imageData);
      },
      err => {
        console.log(err);
      }
    );
  }

  sendData(imageData) {
    this.userData.imageB64 = imageData;
    this.userData.user_id = this.userDetails.user_id;
    this.userData.token = this.userDetails.token;
    console.log(this.userData);
    this.authService.postData(this.userData, "userImage").then(
      result => {
        this.responseData = result;
      },
      err => {
        // Error log
      }
    );
  }
}
