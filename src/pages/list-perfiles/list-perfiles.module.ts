import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPerfilesPage } from './list-perfiles';

@NgModule({
  declarations: [
    ListPerfilesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPerfilesPage),
  ],
})
export class ListPerfilesPageModule {}
