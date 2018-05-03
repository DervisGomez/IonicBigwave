import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPerfilesPage } from '../list-perfiles/list-perfiles';
import { IndependientsPage } from '../independients/independients';
import { SellersPage } from '../sellers/sellers';
import { PymesPage } from '../pymes/pymes';


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

  goListPymes(){
    this.navCtrl.push(PymesPage);
  }

  goListIndependients(){
    this.navCtrl.push(IndependientsPage);
  }

  goListSellers(){
    this.navCtrl.push(SellersPage);
  }

  goListOfertas(){
    //this.navCtrl.push(IndependientsPage);
  }

  goListProducts(){
    //this.navCtrl.push(IndependientsPage);
  }

}
