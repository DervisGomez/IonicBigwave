import { Component } from '@angular/core';
import { NavController, Events, AlertController } from 'ionic-angular';
import { ListPerfilesPage } from '../list-perfiles/list-perfiles';
import { IndependientsPage } from '../independients/independients';
import { Storage } from '@ionic/storage';
import { SellersPage } from '../sellers/sellers';
import { PymesPage } from '../pymes/pymes';
import { SavePymesPage } from '../save-pymes/save-pymes';
import { SaveIndependientsPage } from '../save-independients/save-independients';
import { SaveSellersPage } from '../save-sellers/save-sellers';



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
    public alertCtrl: AlertController) {
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
              console.log('Disagree clicked');
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
              console.log('Disagree clicked');
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
              console.log('Disagree clicked');
            }
          }
        ]
      });
      confirm.present();      
    }else{
      this.navCtrl.push(SaveSellersPage,{user_id: this.user.id});
    }
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
    //this.navCtrl.push(IndependientsPage);
  }

}
