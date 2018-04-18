import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, Platform, NavParams, Events, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Angular2TokenService} from 'angular2-token';
import { routes } from '../../config/routes';
import { ROOT } from '../../config/routes';

import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

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
  title="Editar Perfil";
  lastImage: string = null;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public _modal: ModalController,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    public fb: FormBuilder,
    public userProvider: UserProvider,
    public storage: Storage,
    private _tokenService: Angular2TokenService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public platform: Platform
  ){
    this._tokenService.init({apiBase: ROOT});
  	this.user = this.navParams.get("user");
  	console.log(this.user);

    this.action=this.navParams.get("action");
    console.log(this.action)
    if (this.action=="password") {
      this.password_show=true;      
      this.title="Cambiar Contraseña";
    }

    if (this.user.image==null) {
      this.lastImage='https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg'
    }else{
      this.lastImage=this.user.image;
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

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            //this.getPicture()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
  // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      //this.presentToast(imagePath);
      this.lastImage = `data:image/jpeg;base64,${imagePath}`;
      
    }, (err) => {
      this.messages('Error while selecting image.'+err);
    });
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (user) {
        this.user = JSON.parse(user);
        console.log(this.user);
      }else{
      	this.navCtrl.setRoot("LoginPage",{data: "PerfilPage"});
      }

    });//storage user
  }


  edit(){
   	let loading = this.loading.create({ content: 'Cargando...' });     
      if (!this.password_show) {
        this.title="Editar Perfil";
        if (this.form.value.current_password==""&&this.form.value.current_password==undefined) {
          this.messages("Contraseña invalida.");
          return
        }
        if (this.form.value.email==""&&this.form.value.email==undefined) {
          this.messages("Email invalido");
          return
        }
        if (this.form.value.name==""&&this.form.value.name==undefined) {
          this.messages("Nombre invalido.");
          return
        }
        if (this.form.value.nickname==""&&this.form.value.nickname==undefined) {
          this.messages("Nickname invalido.");
          return
        }
        this.form.value.password=this.form.value.current_password;
        this.form.value.password_confirm=this.form.value.current_password;
      } 
      if (this.form.value.password==this.form.value.password_confirm) {
        loading.present();
        console.log(this.form.value)
        let url = routes.registerUser();

        if(this.lastImage=="https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg"){
          this.form.value.image=this.lastImage;
          console.log(this.form.value)
        }else{
          this.form.value.image=this.lastImage;
        }

        this._tokenService.put(url, this.form.value).subscribe(
          data =>      {
            data = JSON.parse(data['_body']);
            console.log("data:: ", data);
            this.user = Object.assign({}, this.user, data['data']);
            this.events.publish("userLogin", this.user);            
            this.storage.set('user', JSON.stringify(this.user));
            loading.dismiss();

            if (!this.password_show) {
              this.messages("Perfil actualizado")
            }else{
              this.messages("Contraseña actualizada")
            } 
            this.navCtrl.setRoot("PerfilPage") 
          },
          error => {
            console.log(error)
            try{
              //this.messages(error.error.errors.full_messages[0]);
              this.messages("Ha ocurrido un error");
            }catch(err){
              this.messages("Ha ocurrido un error");
            }
            loading.dismiss();
            //this.toastr.error('Perfil No Actualizado!', 'Major Error');
          });
      }else{
        this.messages("Las contraseñas no son iguales");
      }
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
