import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPerfilesPage } from '../list-perfiles/list-perfiles';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goList(perfil){
  	this.navCtrl.push(ListPerfilesPage,{data: perfil});
  }

}
