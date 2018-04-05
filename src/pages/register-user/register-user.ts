import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  form: FormGroup;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public _modal: ModalController,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public userProvider: UserProvider,
    public menuCtrl: MenuController
  ){
    this.menuCtrl.enable(false); 
    
    this.form = this.fb.group({
	    email: ['', Validators.required],
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
	    ])],
	    // image: ['', Validators.required],
    });  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  register(){
    if (this.form.valid) {
     	 let loading = this.loading.create({ content: 'Cargando...' });
      	loading.present();    

      	console.log(this.form.value)

		this.userProvider.register({ email: this.form.value.email, name: this.form.value.name, nickname: this.form.value.nickname, password: this.form.value.password, password_confirm: this.form.value.password_confirm }).subscribe( data => {
			console.log(data)
			loading.dismiss();
			let toast = this.toastCtrl.create({ message: "Registro exitoso", duration: 3000, position: 'top' });
			toast.present();     
			this.navCtrl.setRoot("LoginPage")   
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

}
