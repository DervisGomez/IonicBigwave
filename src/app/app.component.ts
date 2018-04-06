import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  user: any;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: Storage,
    public loading: LoadingController,
    public menuCtrl: MenuController,
    public events: Events    
    ){    
    this.checkLogin();
    
    this.events.subscribe("userLogin", (user) => {
      this.user = user;
      console.log("events in component app", this.user)
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (user) {
        this.user = JSON.parse(user);
        this.menuCtrl.enable(true);
        let loading = this.loading.create({content: "cargando"});
      }
    });//storage user
  }

  logout() {
    this.storage.remove('user');
    let loading = this.loading.create({content: 'Cargando...'});
    loading.present().then(() => {
      this.events.publish("userLogin", null);
      loading.dismiss();
    });//Loading
  }

}
