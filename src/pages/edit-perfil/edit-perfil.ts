import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Angular2TokenService} from 'angular2-token';
import { routes } from '../../config/routes';
import { ROOT } from '../../config/routes';


@IonicPage()
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {
  user: any;
  form: FormGroup;
  action: any;
  password_show=false;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public _modal: ModalController,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public userProvider: UserProvider,
    public storage: Storage,
    private _tokenService: Angular2TokenService
  ){
    this._tokenService.init({apiBase: ROOT});
  	this.user = this.navParams.get("user");
  	console.log(this.user);

    this.action=this.navParams.get("action");
    console.log(this.action)
    if (this.action=="password") {
      this.password_show=true;
    }

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
        current_password:  ['', Validators.compose([
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
    var object = this;
    if (!this.password_show) {
      this.form.value.password=this.form.value.current_password;
      this.form.value.password_confirm=this.form.value.current_password;
    }

    if (this.form.value.password==this.form.value.password_confirm) {
      console.log(this.form.value)
      let url = routes.registerUser();
      this._tokenService.put(url, this.form.value).subscribe(
        data =>      {
          data = JSON.parse(data['_body']);
          console.log("data:: ", data);
          this.user = Object.assign({}, this.user, data['data']);
          loading.dismiss();
          let toast = this.toastCtrl.create({ message: "Perfil actualizado", duration: 3000, position: 'top' });
          toast.present();     
          this.navCtrl.setRoot("PerfilPage")  
          //this.toastr.success('Perfil Actualizado!', 'Toastr fun!');
          //this.loading=false;
        },
        error => {
          let toast = this.toastCtrl.create({
            message: error.error.errors[0],
            duration: 3000,
            position: 'top'
          });
          toast.present()
          loading.dismiss();
          //this.toastr.error('Perfil No Actualizado!', 'Major Error');
        });
    }else{
      loading.dismiss();
      let toast = this.toastCtrl.create({ message: "Las contraseñas no coinciden", duration: 3000, position: 'top' });
          toast.present();
    }
    //this.form.value.current_password="12345678";
    

    /*this.storage.get('headers').then((data2)=>{
        console.log(data2);
      this.userProvider.edit({ email: this.form.value.email, name: this.form.value.name, nickname: this.form.value.nickname, password: this.form.value.password, password_confirm: this.form.value.password_confirm },data2).subscribe( data => {
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
    });*/
	
  }
}
