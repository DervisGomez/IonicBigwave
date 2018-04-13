import { Component, ViewChild } from '@angular/core';
import { Platform,Content, Nav, LoadingController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  user: any;
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Content) content: Content;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: Storage,
    public loading: LoadingController,
    public menuCtrl: MenuController,
    public events: Events,
    public appCtrl: App   
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
      }
    });//storage user
  }

  logout() {
    this.storage.remove('user');
    let loading = this.loading.create({content: 'Cargando...'});
    loading.present().then(() => {
      this.events.publish("userLogin", null);
      this.user=null;
      this.menuCtrl.enable(false);
      loading.dismiss();
      //this.appCtrl.getRootNav().setRoot(TabsPage,{sesion:1});
    });//Loading
  }

}
