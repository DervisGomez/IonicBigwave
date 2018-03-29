import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  user: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public storage: Storage,
    public loading: LoadingController,
    public events: Events
  ){
  	this.checkLogin();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (user) {
        this.user = JSON.parse(user).data;
        let loading = this.loading.create({content: "cargando"});
  		this.getMessage();
      }else{
      	this.navCtrl.push("LoginPage",{data: "MessagesPage"});
      }

    });//storage user
  }  

  getMessage(){

  }

}
