import { Component } from '@angular/core';
import { NavController, Events, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ListPerfilesPage } from '../list-perfiles/list-perfiles';
import { IndependientsPage } from '../independients/independients';
import { Storage } from '@ionic/storage';
import { SellersPage } from '../sellers/sellers';
import { PymesPage } from '../pymes/pymes';
import { SavePymesPage } from '../save-pymes/save-pymes';
import { SaveIndependientsPage } from '../save-independients/save-independients';
import { SaveSellersPage } from '../save-sellers/save-sellers';
import { ListProductsPage } from '../list-products/list-products';
import { ROOT } from '../../config/routes';
import { Angular2TokenService} from 'angular2-token'
import { routes } from '../../config/routes';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private _tokenService: Angular2TokenService) {

    this._tokenService.init({apiBase: ROOT});
    this.checkLogin();
    this.events.subscribe("userLogin", (user) => {
      this.user = user;
      console.log("events in perfil", this.user);
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  crearTienda(){
    if(this.user==null){
      let confirm = this.alertCtrl.create({
        title: 'Crear Tienda',
        message: 'Para crear tu tienda debes registrarte',
        buttons: [
          {
            text: 'ok',
            handler: () => {
              this.navCtrl.parent.select(2); 
            }
          }
        ]
      });
      confirm.present();      
    }else{
      this.navCtrl.push(SavePymesPage,{user_id: this.user.id});
    }
  }

  crearProfesional(){
    if(this.user==null){
      let confirm = this.alertCtrl.create({
        title: 'Crear Profesional',
        message: 'Para mostrar tu profesión debes registrarte',
        buttons: [
          {
            text: 'ok',
            handler: () => {
              this.navCtrl.parent.select(2); 
            }
          }
        ]
      });
      confirm.present();      
    }else{
      this.navCtrl.push(SaveIndependientsPage,{user_id: this.user.id});
    }
  }

  crearVender(){
    if(this.user==null){
      let confirm = this.alertCtrl.create({
        title: 'Deseas Vender',
        message: 'Para vender debes registrarte',
        buttons: [
          {
            text: 'ok',
            handler: () => {
              this.navCtrl.parent.select(2); 
            }
          }
        ]
      });
      confirm.present();      
    }else{
      //
     this.checkVender()
    }
  }

  checkVender(){
    let loading = this.loading.create({ content: 'Cargando...' });
    loading.present();
    let url = routes.sellersShow();
    this._tokenService.get(url).subscribe(
      data => {
        loading.dismiss();
        console.log(data)
        data = JSON.parse(data['_body']);
        if (data['data'].length){
          let pymes = data['data'];
          console.log(pymes);
          this.messages("Ya ha creado un perfil para vender y solo puede tener uno");
        }else{
          this.navCtrl.push(SaveSellersPage,{user_id: this.user.id});
        }
      },
      error =>  {
        console.log(error)
        loading.dismiss();
        this.messages("en este momento no puede crear su perfil para vender por favor intentelos más tarde.");
      }
    );
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      if (user) {
        this.user = JSON.parse(user);
      }else{
        //this.navCtrl.setRoot(LoginPage,{data: PerfilPage});
      }
    });//storage user
  }

  messages(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present()
  }

  goList(perfil){
  	this.navCtrl.push(ListPerfilesPage,{data: perfil});
  }

  goListPymes(){
    this.navCtrl.push(PymesPage);
  }

  goListIndependients(){
    this.navCtrl.push(IndependientsPage);
  }

  goListSellers(){
    this.navCtrl.push(SellersPage);
  }

  goListOfertas(){
    //this.navCtrl.push(IndependientsPage);
  }

  goListProducts(){
    this.navCtrl.push(ListProductsPage);
  }

}
