import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Angular2TokenService} from 'angular2-token';
import { ROOT } from '../../config/routes';
import { routes } from '../../config/routes';

/**
 * Generated class for the SaveIndependientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-independients',
  templateUrl: 'save-independients.html',
})
export class SaveIndependientsPage {
  form: FormGroup;
  user: any;
  categories: any = [];
  categoriesCheck: any =[];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public storage: Storage,
    public alertCtrl: AlertController,
    private _tokenService: Angular2TokenService) {
  	this._tokenService.init({apiBase: ROOT});
    
    this.form = this.fb.group({
	    email: "",
	    name: ['', Validators.required],
	    user_id: navParams.get("user_id"),
      category_ids:"",
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
    console.log('ionViewDidLoad SaveIndependientsPage');
  }

  createPyme(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    let url = routes.independentsCreate();
    this.form.value.category_ids=this.categoriesCheck;
    console.log(this.form.value);
    let params= {"profile": this.form.value} //JSON.stringify(
    this._tokenService.post(url, params).subscribe(
      data =>      {
        data = JSON.parse(data['_body']);
        console.log(data);
        loading.dismiss();
        this.messages("Profesional Creado Exitosamente");
        this.navCtrl.pop()
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

  showCheckbox() {
    if(this.categories.length>0){
      this.configCheckbox();
    }else{
      this.getCategories();
    }    
    
  }

  configCheckbox(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Categorias');
    for (var i = 0; i<this.categories.length; i++) {
      this.categories[i].checked=this.verificarCheckbox(this.categories[i].id);
      alert.addInput({
        type: 'checkbox',
        label: this.categories[i].attributes.name,
        value: this.categories[i].id,
        checked: this.categories[i].checked
      });
      
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Listo',
      handler: data => {
        this.categoriesCheck=data;
        if (this.categoriesCheck.length>0) {
          this.textCategories()
        }else{
          this.messages("No selecciono ninguna categoria");
          this.textCategories()
        }
        console.log('Checkbox data:', data);
      }
    });
    alert.present();
  }

  textCategories(){
    let text=""
    for (var i = 0; i < this.categoriesCheck.length; i++) {
      for (var j = 0; j < this.categories.length; j++) {
        if(this.categoriesCheck[i]==this.categories[j].id){
          text=text+"- "+this.categories[j].attributes.name+".\n";
        }
      }
    }
    console.log('Checkbox data:', text);
    //this.form.value.category_ids=text;
    this.form.setValue({
      email: this.form.value.email,
      name: this.form.value.name,
      user_id: this.navParams.get("user_id"),
      category_ids:text,
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
      description: this.form.value.description,
      web: null,
      profile: null,
      experience: null
    });
    console.log('Checkbox data:', this.form.value.category_ids);
  }


  verificarCheckbox(id){
    if(this.categoriesCheck.length>0){
      for (var i = 0;i<this.categoriesCheck.length; i++) {
        if(this.categoriesCheck[i]==id){
          return true;
        }
      }
    }
    return false;
  }

  getCategories(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    let url = routes.categories();
    this._tokenService.get(url).subscribe(
      data =>      {
        loading.dismiss();
        console.log(data)
        data = JSON.parse(data['_body']);
        if (data['data'].length){
          this.categories = data['data'];
          console.log(this.categories);
          this.configCheckbox();
        }
      },
      error =>  {
        console.log(error)
        loading.dismiss();
        this.messages("Ha ocurrido un error al cargar la inforamción.");
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
