import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WishesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishes',
  templateUrl: 'wishes.html',
})
export class WishesPage {
	user: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public storage: Storage,
    public loading: LoadingController,
    public events: Events) {
  	this.checkLogin();
    this.events.subscribe("userLogin", (user) => {
      this.user = user;
      console.log("events in perfil", this.user);
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishesPage');
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (user) {
        this.user = JSON.parse(user);
      }else{
      	//this.navCtrl.setRoot("LoginPage",{data: "WishesPage"});
      }
    });//storage user
  }
}
