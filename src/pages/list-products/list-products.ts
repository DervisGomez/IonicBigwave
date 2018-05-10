import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ROOT } from '../../config/routes';
import { Angular2TokenService} from 'angular2-token'
import { routes } from '../../config/routes';
import { imageconst } from '../../config/constant';

/**
 * Generated class for the ListProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-products',
  templateUrl: 'list-products.html',
})
export class ListProductsPage {

  list: any = [];
  listAll: any =[];
  categories: any = [];
  categoriesCheck: any =[];
  title;
  showSearch=false;
  titleFiltrar="Filtrar";
  imagen: any={};
  imagenBaner;
  imagenLogo;
  searchText;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private _tokenService: Angular2TokenService) {

    this._tokenService.init({apiBase: ROOT});
    this.imagen={
      baner:imageconst.banner,
      logo:imageconst.logo,
      pyme:imageconst.pymes,
      seller:imageconst.sellers,
      independient:imageconst.independients
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProductsPage');
    this.getLists();
  }

  getItems(searchbar) {
    this.list=this.listAll;
    var q = searchbar.srcElement.value;

    if (!q) {
      return;
    }

    this.list = this.listAll.filter((v) => {
      if(v.attributes.name && q) {
        if (v.attributes.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  goShowSearch(){
    this.showSearch=true;
    this.titleFiltrar="";
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
          //this.filtrarCategories();
        }else{
          this.messages("No selecciono ninguna categoria");
          let item=[];
          this.list=item;
          this.configCheckbox();
          //this.filtrarCategories();
        }
        console.log('Checkbox data:', data);
      }
    });
    alert.present();
  }

  filtrarCategories(){
    let item=[];
    for (var i = 0;i<this.listAll.length; i++) {
      if (this.listAll[i].attributes.categories.length>0) {
        if(this.incluirCategories(i)){
          item.push(this.listAll[i]);
        }else{
          console.log("Categorias: "+this.listAll[i].attributes.categories);
        }
      }else{
        console.log("no");
      }
    }
    this.list=item;
    if(this.list.length<1){
      this.messages("No hay perfiles "+this.title+" para las categorias seleccionadas")
    }
  }

  incluirCategories(i){
    let categories=this.listAll[i].attributes.categories;
    for (var j = 0;j<categories.length; j++) {
      for (var k = 0;k<this.categoriesCheck.length; k++) {
        if(categories[j].id==this.categoriesCheck[k]){
          return true;
        }
      }
    }
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

  getLists(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    let url = routes.productsAll();
    this.title="Productos"
    this._tokenService.get(url).subscribe(
      data => {
        loading.dismiss();
        console.log(data)
        data = JSON.parse(data['_body']);
        if (data['data'].length){
          this.listAll = data['data'];
          this.list=this.listAll;
          console.log(this.list);
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

  messages(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }

}
