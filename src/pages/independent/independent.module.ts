import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndependentPage } from './independent';

@NgModule({
  declarations: [
    IndependentPage,
  ],
  imports: [
    IonicPageModule.forChild(IndependentPage),
  ],
})
export class IndependentPageModule {}
