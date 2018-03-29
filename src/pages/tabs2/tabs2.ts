import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs2',
  templateUrl: 'tabs2.html',
})
export class Tabs2Page {

  tab1Root = HomePage;
  tab2Root = 'ExplorePage';
  tab3Root = 'NearbyPage';
  tab4Root = 'MessagesPage';
  tab5Root = 'PerfilPage';
  	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs2Page');
  }

}
