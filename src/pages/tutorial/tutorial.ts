import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController) {
	this.slides = [
	  {
		title: "Selamat datang di aplikasi BookingKuy",
		description: "Aplikasi <b>BookingKuy</b> adalah aplikasi yang memudahkan mahasiswa IPB untuk menyewa ruangan serta memudahkan staff dalam mengelola ruangan",
		image: 'assets/img/ica-slidebox-img-1.png',
	  },
	  {
		title: "Bagaimana cara menggunakannya?",
		description: "Pilih login sebagai mahasiswa jika ingin menyewa ruangan atau login sebagai staff jika berperan sebagai penyewa ruangan.",
		image: 'assets/img/ica-slidebox-img-2.png',
	  },
	  {
		title: "Getting Started",
		description: "Silakan hubungi Iqah, Dikma, Idzhar, atau Gilang jika masih bingung :)",
		image: 'assets/img/ica-slidebox-img-3.png',
	  }
	];
    
  }

  startApp() {
    this.navCtrl.setRoot(HomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }
}
