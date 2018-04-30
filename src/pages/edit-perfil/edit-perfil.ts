import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, Platform, NavParams, Events, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Angular2TokenService} from 'angular2-token';
import { routes } from '../../config/routes';
import { ROOT } from '../../config/routes';
import { Camera } from '@ionic-native/camera';
import { PerfilPage } from '../perfil/perfil';


@IonicPage()
@Component({
  selector: 'page-edit-perfil',
  templateUrl: 'edit-perfil.html',
})
export class EditPerfilPage {
  smallSize: string;
  smallImg: any;
  bigSize: string;
  bigImg: string;
  user: any;
  form: FormGroup;
  action: any;
  password_show=false;
  title="Editar Perfil";
  lastImage="https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg";

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
    this.action=this.navParams.get("action");

    if (this.action=="password") {
      this.password_show=true;      
      this.title="Cambiar Contraseña";
    }       

    this.form = this.fb.group({
	    email: [this.user.email, Validators.compose([
          Validators.required,
          Validators.email,
      ])],
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

    if (this.user.avatar.url==null) {
      console.log("si")
      this.lastImage='https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg';
    }else{
      console.log("no")
      this.lastImage="https://bigwave.herokuapp.com"+this.user.avatar.url;
    }    	
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
      this.bigImg = this.lastImage;
      this.bigSize = this.getImageSize(this.bigImg);
      this.createThumbnail()
    }, (err) => {
      this.messages('Error while selecting image.'+err);
    });
  }
  getImageSize(data_url) {
    var head = 'data:image/jpeg;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
  }
  createThumbnail() {
    this.generateFromImage(this.bigImg, 200, 200, 0.5, data => {
      this.smallImg = data;
      this.lastImage = this.smallImg;
    });
  }
  generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
    var canvas: any = document.createElement("canvas");
    var image = new Image();
 
    image.onload = () => {
      var width = image.width;
      var height = image.height;
 
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
 
      ctx.drawImage(image, 0, 0, width, height);
 
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);
 
      callback(dataUrl)
    }
    image.src = img;
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
        if (this.form.value.email==""||this.form.controls.email.errors) {
          this.messages("Email invalido");
          return
        }
        if (this.form.value.name==""||this.form.controls.name.errors) {
          this.messages("Nombre invalido.");
          return
        }
        if (this.form.value.nickname==""||this.form.controls.nickname.errors) {
          this.messages("Nickname invalido.");
          return
        }
        if (this.form.value.current_password==""||this.form.controls.current_password.errors) {
          this.messages("Contraseña invalida.");
          return
        }
        this.form.value.password=this.form.value.current_password;
        this.form.value.password_confirm=this.form.value.current_password;
      }else{
        if (this.form.value.password==""||this.form.controls.password.errors) {
          this.messages("Contraseña Nueva invalida.");
          return
        }
        if (this.form.value.password_confirm==""||this.form.controls.password_confirm.errors) {
          this.messages("Confirmacion de contraseña invalida.");
          return
        }
      }
      
      if (this.form.value.password==this.form.value.password_confirm) {
        loading.present();
        console.log(this.form.value)
        let url = routes.registerUser();

        if(this.lastImage=="https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg"){
          //this.form.value.avatar=this.lastImage;
          console.log(this.form.value)
        }else{
          this.form.value.avatar=this.lastImage;
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
            this.navCtrl.setRoot(PerfilPage) 
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

  removeSpaces(email){
    let strParse = new String(email.value);
    let campo = strParse.trim();
    email.value = campo;
    console.log(campo)
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
