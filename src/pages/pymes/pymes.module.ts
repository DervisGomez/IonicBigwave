import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PymesPage } from './pymes';

@NgModule({
  declarations: [
    PymesPage,
  ],
  imports: [
    IonicPageModule.forChild(PymesPage),
  ],
})
export class PymesPageModule {}
