import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {
  user: any;
  form: FormGroup;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public _modal: ModalController,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public userProvider: UserProvider,
    public storage: Storage,
  ){
  	this.user = this.navParams.get("user");
  	console.log(this.user);
    this.form = this.fb.group({
	    email: [this.user.email, Validators.required],
	    name: [this.user.name, Validators.required],
	    nickname: [this.user.nickname, Validators.required],
      	password:  ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(15),
	        Validators.minLength(8),
	    ])],
      	password_confirm:  ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(15),
	        Validators.minLength(8),
	    ])],
	    // image: ['', Validators.required],
    });    	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPerfilPage');
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (user) {
        this.user = JSON.parse(user);
        console.log(this.user);
        let loading = this.loading.create({content: "cargando"});
      }else{
      	this.navCtrl.setRoot("LoginPage",{data: "PerfilPage"});
      }

    });//storage user
  }


  edit(){
 	 let loading = this.loading.create({ content: 'Cargando...' });
  	loading.present();    

  	console.log(this.form.value)

	this.userProvider.edit({ email: this.form.value.email, name: this.form.value.name, nickname: this.form.value.nickname, password: this.form.value.password, password_confirm: this.form.value.password_confirm }).subscribe( data => {
		console.log(data)
		loading.dismiss();
		let toast = this.toastCtrl.create({ message: "Perfil actualizado", duration: 3000, position: 'top' });
		toast.present();     
		this.navCtrl.setRoot("PerfilPage")   
	},
	err => {
		let toast = this.toastCtrl.create({
			message: err.error.errors[0],
			duration: 3000,
			position: 'top'
		});
		toast.present()

		loading.dismiss();
	});
  }
}
