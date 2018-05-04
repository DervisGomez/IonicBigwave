import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveSellersPage } from './save-sellers';

@NgModule({
  declarations: [
    SaveSellersPage,
  ],
  imports: [
    IonicPageModule.forChild(SaveSellersPage),
  ],
})
export class SaveSellersPageModule {}
