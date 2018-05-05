import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Angular2TokenService} from 'angular2-token';
import { ROOT } from '../../config/routes';
import { routes } from '../../config/routes';

/**
 * Generated class for the SavePymesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-pymes',
  templateUrl: 'save-pymes.html',
})
export class SavePymesPage {
  form: FormGroup;
  user: any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public storage: Storage,
    private _tokenService: Angular2TokenService) {

  	this._tokenService.init({apiBase: ROOT});
    
    this.form = this.fb.group({
	    email: ['', Validators.compose([
          Validators.required,
          Validators.email,
      	])],
	    name: ['', Validators.required],
	    user_id: navParams.get("user_id"),
	    type_profile: "pyme",
	    title: "",
	    banner: null,
	    photo: null,
	    launched: null,
	    phone: null,
	    url: null,
	    address: null,
	    vision: null,
	    mission: null,
	    description: '',
	    web: null,
	    profile: null,
	    experience: null
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavePymesPage');
  }

  createPyme(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    let url = routes.pymesCreate();
    this.form.value.category_ids=["1","2","3"];
    console.log(this.form.value);
    let params= {"profile": this.form.value} //JSON.stringify(
    this._tokenService.post(url, params).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        console.log(data);
        loading.dismiss();
        this.messages("Tienda Creada Exitosamente");
      },
      error =>   {
        loading.dismiss();
        console.log(error)
        try{
           //this.messages(error.error.errors.full_messages[0]);
            this.messages("Ha ocurrido un error");
        }catch(err){
            this.messages("Ha ocurrido un error");
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
