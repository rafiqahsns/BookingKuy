import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RuanganPage } from './ruangan';
import { InfoRuanganPage } from '../info-ruangan/info-ruangan';

@NgModule({
  declarations: [
    RuanganPage,
  ],
  imports: [
    IonicPageModule.forChild(RuanganPage),
  ],
})
export class RuanganPageModule {}
