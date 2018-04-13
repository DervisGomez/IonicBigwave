import { Component } from '@angular/core';
import { Events, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  user: any;
  tab1Root = HomePage;
  tab2Root = 'WishesPage';
  tab3Root = 'NearbyPage';
  tab4Root = 'MessagesPage';
  tab5Root = 'PerfilPage';

  constructor(
  	public storage: Storage,
    public navParams: NavParams,
    public events: Events
  ){
    this.events.subscribe("userLogin", (user) => {
      this.user = user;
      console.log("events in tabs", this.user)
    });  	
  	this.checkLogin();
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (user) {
        this.user = JSON.parse(user);
        if(this.navParams.get("sesion")){
          this.user=null;
        }
      }else{
        
      }

    });//storage user
  }
}
