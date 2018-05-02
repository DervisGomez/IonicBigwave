import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ROOT } from '../../config/routes';
import { Angular2TokenService} from 'angular2-token'
import { routes } from '../../config/routes';

/**
 * Generated class for the ListPerfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-perfiles',
  templateUrl: 'list-perfiles.html',
})
export class ListPerfilesPage {
	pymes: any = [];
  categories: any = [];
  categoriesCheck: any =[];
	action: any;
	title;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private _tokenService: Angular2TokenService) {

  	this._tokenService.init({apiBase: ROOT});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPerfilesPage');
    this.action=this.navParams.get("data");
    console.log(this.action);
    this.getPymes();
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
        console.log('Checkbox data:', data);
      }
    });
    alert.present();
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

  /*presentModal() {
   let profileModal = this.modalCtrl.create(ListCategoriesPage, { userId: 8675309 });
   profileModal.onDidDismiss(data => {
     console.log(data);
   });
   profileModal.present();
 }*/


  getPymes(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    let url;
    switch (this.action) {
    	case 1:
    		url = routes.pymes();
    		this.title="Pymes"
    		break;
    	case 2:
    		url = routes.independents();
    		this.title="Independientes"
    		break;
    	case 3:
    		url = routes.sellers();
    		this.title="Sellers"
    		break;  	
    	default:
    		this.messages("Ha ocurrido un error al cargar la inforamción.");
    		break;
    }
    this._tokenService.get(url).subscribe(
      data => {
      	loading.dismiss();
      	console.log(data)
      	data = JSON.parse(data['_body']);
        if (data['data'].length){
          this.pymes = data['data'];
          console.log(this.pymes);
        }
      },
      error =>  {
      	console.log(error)
        loading.dismiss();
        this.messages("Ha ocurrido un error al cargar la inforamción.");
      }
    );
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

  getSellers(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    let url = routes.sellers();
    this._tokenService.get(url).subscribe(
      data =>      {
        loading.dismiss();
      	console.log(data)
      	data = JSON.parse(data['_body']);
        if (data['data'].length){
          this.pymes = data['data'];
          console.log(this.pymes);
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
