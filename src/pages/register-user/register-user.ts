import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, MenuController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Angular2TokenService} from 'angular2-token';
import { ROOT } from '../../config/routes';
import { PerfilPage } from '../perfil/perfil'

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  form: FormGroup;
  user: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public _modal: ModalController,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public storage: Storage,
    public userProvider: UserProvider,
    public menuCtrl: MenuController,
    public events: Events,
    private _tokenService: Angular2TokenService
  ){
    this._tokenService.init({apiBase: ROOT});
    this.menuCtrl.enable(false); 
    
    this.form = this.fb.group({
	    email: ['', Validators.compose([
          Validators.required,
          Validators.email,
      ])],
	    name: ['', Validators.required],
	    nickname: ['', Validators.required],
      	password:  ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(15),
	        Validators.minLength(8),
	    ])],
      	password_confirm:  ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(15),
	        Validators.minLength(8),
	    ])]
    });  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  register(){
    if (this.form.controls.name.errors||this.form.value.name=="") {
      this.messages("Nombre invalido");
      return
    }
    if (this.form.controls.email.errors||this.form.value.email=="") {
      this.messages("Correo invalido");
      return
    }
    if (this.form.controls.nickname.errors||this.form.value.nickname=="") {
      this.messages("Nickname invalido");
      return
    }
    if (this.form.controls.password.errors||this.form.value.password=="") {
      this.messages("Contraseña invalida");
      return
    }
    if (this.form.controls.password_confirm.errors||this.form.value.password_confirm=="") {
      this.messages("Contraseña invalida");
      return
    }
    if (this.form.value.password!=this.form.value.password_confirm) {
      this.messages("Contraseña no coinciden");
      return
    }
    
     	 let loading = this.loading.create({ content: 'Cargando...' });
      	loading.present();    

      	console.log(this.form.value)

  		this.userProvider.register({ email: this.form.value.email, name: this.form.value.name, nickname: this.form.value.nickname, password: this.form.value.password, password_confirm: this.form.value.password_confirm }).subscribe( data => {
  			console.log(data)
  			//loading.dismiss();
  			let toast = this.toastCtrl.create({ message: "Registro exitoso", duration: 3000, position: 'top' });
  			toast.present();     
  			//this.navCtrl.setRoot("LoginPage")
        this.login(this.form.value.email,this.form.value.password,loading)
  		},
  		err => {
        loading.dismiss();
        console.log(err)
        try{
          //this.messages(err.error.errors.full_messages[0]);
          this.messages("Ha ocurrido un error");
        }catch(err){
          this.messages("Ha ocurrido un error");
        }
        
  		});
  }

   login(email,password,loading){
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
        this.navCtrl.setRoot(PerfilPage)
      },
      error =>    {
        console.log(error);
        loading.dismiss();
        //this.loading=false;
        //this.errorHttp = true; this.loading=false; console.log(error._body);
        if (error && '_body' in error){          
          this.messages("an error has occurred, log in again");
        }
      }
    );
  }

  messages(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }

}
