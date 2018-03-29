import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public menuCtrl: MenuController,
    public events: Events
  ){
    this.menuCtrl.enable(false); 
    
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignIn(){
    this.navCtrl.push("RegisterUserPage");
  }  

  removeSpaces(email){
    let strParse = new String(email.value);
    let campo = strParse.trim();
    email.value = campo;
    console.log(campo);
  }  

  login(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();

    this.userProvider.login({
      email: this.form.value.email,
      clave: this.form.value.password
    }).subscribe((data) => {
      
      loading.dismiss();

      console.log(data['headers'].get('client'), data['headers'].get('uid'))

      let user = data.body.data;
      let headers = {
        'access-token': data['headers'].get('access-token'),
        'uid': data['headers'].get('access-token'),
        'client': data['headers'].get('client')
      }

      this.storage.set("user", JSON.stringify(user)).then((user) => {
        let userJson = JSON.parse(user);
        console.log(userJson)
        this.events.publish("userLogin", userJson);
        this.storage.set("headers", headers);
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(TabsPage);    
      });      

    },
    err => {
      let toast = this.toastCtrl.create({
        message: "He ocurrido un error, por favor intente luego",
        duration: 3000,
        position: 'top'
      });
      toast.present()

      loading.dismiss();
    });
  }

}
