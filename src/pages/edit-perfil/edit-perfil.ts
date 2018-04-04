import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';


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
  ){
  	this.user = this.navParams.get("user");
    this.form = this.fb.group({
	    email: ['', Validators.required],
	    name: ['', Validators.required],
	    nickname: ['', Validators.required],
      	password:  ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(8),
	        Validators.minLength(15),
	    ])],
      	password_confirm:  ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(8),
	        Validators.minLength(15),
	    ])],
	    // image: ['', Validators.required],
    });    	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPerfilPage');
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
		message: err.errors[0],
		duration: 3000,
		position: 'top'
		});
		toast.present()

		loading.dismiss();
	});
  }
}
