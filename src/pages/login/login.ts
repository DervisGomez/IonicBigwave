import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Angular2TokenService} from 'angular2-token';
import { ROOT } from '../../config/routes';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;
  currentTab: any;
  user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public menuCtrl: MenuController,
    public events: Events,
    private _tokenService: Angular2TokenService
  ){
    this._tokenService.init({apiBase: ROOT});
    console.log(ROOT)
    this.menuCtrl.enable(false); 
    
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    

    this.currentTab = this.navParams.get("data");

    this.events.subscribe("userLogin", (user) => {
      this.user = user;
      console.log("events in login", this.user);
      //this.navCtrl.setRoot(this.currentTab);
    });      
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage a:', this.currentTab);
  }

  goToSignIn(){
    this.navCtrl.push("RegisterUserPage");
  }  

  removeSpaces(email){
    let strParse = new String(email.value);
    let campo = strParse.trim();
    email.value = campo;
  }  

  login(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();

    if (this.form.value.email==undefined||this.form.value.email=="") {
      loading.dismiss();
      this.message("Email Invalid.");
      return
    }
    if (this.form.value.password=="") {
      loading.dismiss();
      this.message("password Invalid.");
      return
    }
    this._tokenService.signIn({
      email:    this.form.value.email,
      password: this.form.value.password
    }).subscribe(
      data => {
        console.log(data);
        //this.loading=false;
        var token, uid, client;
        token = data['headers'].get('access-token');
        client = data['headers'].get('client');
        uid = data['headers'].get('uid');
        data = JSON.parse(data['_body']);
        this.user = data['data'];
        console.log(this.user)
        let header={
          token:token,
          client:client,
          uid:uid
        }
        console.log(header);
        this.storage.set('headers', header);
        this.storage.set('user', JSON.stringify(this.user));
        loading.dismiss();
        this.events.publish("userLogin", this.user);
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(this.currentTab);
      },
      error =>    {
        console.log(error);
        loading.dismiss();
        //this.loading=false;
        //this.errorHttp = true; this.loading=false; console.log(error._body);
        if (error && '_body' in error){          
          this.message("Invalid login credentials. Please try again.");
        }
      }
    );
  }

  message(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }

}
