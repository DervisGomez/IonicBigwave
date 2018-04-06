import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
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
    public storage: Storage,
    public loading: LoadingController,
    public events: Events
  ){
  	this.checkLogin();
    this.events.subscribe("userLogin", (user) => {
      this.user = user;
      console.log("events in perfil", this.user);
    });  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage', this.user, this.navParams);
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (user) {
        this.user = JSON.parse(user);
        let loading = this.loading.create({content: "cargando"});
  		this.getPerfil();
      }else{
      	this.navCtrl.setRoot("LoginPage",{data: "PerfilPage"});
      }
    });//storage user
  }

  getPerfil(){
  	this.storage.get('headers').then((data)=>{
      console.log(data);
	  	this.userProvider.perfil(data).subscribe((res => {
	  	  
	      let user = res;
        console.log(res.headers.headers);
	      let headers = {
	        'access-token': res['headers'].get('access-token') == '' ? data['access-token'] : res['headers'].get('access-token'),
	        'uid': res['headers'].get('uid'),
	        'client': res['headers'].get('client')
	      }	  		

	  	  console.log("perfil: ", res)

	      this.storage.set("headers", headers);
	      this.user = res.body.data.attributes;

	  	}))
  	});
  }

  editPerfil(user){
  	this.navCtrl.push("EditPerfilPage",{
  		user: user
  	});
  }

}
