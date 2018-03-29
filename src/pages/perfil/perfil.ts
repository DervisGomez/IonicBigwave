import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
user: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userProvider: UserProvider,
    public storage: Storage
  ){
  	this.getPerfil();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  getPerfil(){
  	this.storage.get('headers').then((data)=>{
	  	this.userProvider.perfil(data).subscribe((data => {
	  		console.log(data);
	  	}))
  	});
  }

}
