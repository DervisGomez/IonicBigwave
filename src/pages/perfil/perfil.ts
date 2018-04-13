import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Angular2TokenService} from 'angular2-token';
import { routes } from '../../config/routes';
import { ROOT } from '../../config/routes';

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
    public toastCtrl: ToastController,
    public events: Events,
    private _tokenService: Angular2TokenService
  ){
    this._tokenService.init({apiBase: ROOT});
    console.log(ROOT)
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
  		  this.getPerfil();
      }else{
      	this.navCtrl.setRoot("LoginPage",{data: "PerfilPage"});
      }
    });//storage user
  }

  getPerfil(){
  	this.storage.get('headers').then((data)=>{
      //this.user = JSON.parse(window.localStorage.getItem('user'));
    /*this.user.token=data['access-token'];
    this.user.client=data.client;;
    this.user.uid=data.uid;*/
    //this.user = JSON.parse(this.storage.get('user'));
    this.user.token=data.token;
    this.user.client=data.client;
    this.user.uid=data.uid;

    console.log(this.user);

    let url = routes.perfil();
      this._tokenService.get(url, this.user).subscribe(
      data =>      {
        console.log(data)
        var data2 = JSON.parse(data['_body']);
        if (!data2){
          //this.router.navigate(['/']);
        }
        let id = data2['data'].id;
        this.user = Object.assign({}, this.user, data2['data'].attributes);
        this.user.id = id;
        //window.localStorage.setItem('user', JSON.stringify(this.user));
        var token, uid, client;        
        client = data['headers'].get('client');
        uid = data['headers'].get('uid');
        token = data['headers'].get('access-token');
        data = JSON.parse(data['_body']);
        this.user = data['data'].attributes;
        console.log(this.user)
        let header={
          token:token,
          client:client,
          uid:uid
        }
        this.storage.set('headers', header);
        this.storage.set('user', JSON.stringify(this.user));
        //this.loading=false;
      },
      error =>   {
        //this.errorHttp = true; this.loading=false;
        try{
          this.message(error.error.errors.full_messages[0]);
        }catch(err){
          this.message("An error has occurred");
        }
        //this.router.navigate(['/']);
      });
  	});
  }

  message(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }

  editPerfil(user){
  	this.navCtrl.push("EditPerfilPage",{
  		user: user,
      action:"edit"
  	});
  }
  passwordPerfil(user){
    this.navCtrl.push("EditPerfilPage",{
      user: user,
      action:"password"
    });
  }


}
