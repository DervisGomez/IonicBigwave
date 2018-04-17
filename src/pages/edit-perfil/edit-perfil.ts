import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, Platform, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Angular2TokenService} from 'angular2-token';
import { routes } from '../../config/routes';
import { ROOT } from '../../config/routes';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

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
    private camera: Camera, private transfer: Transfer,
    private file: File,
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
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

    this.lastImage='https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg'

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
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.'+err);
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
 
// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.presentToast("imgen: "+newFileName);
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
   
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return 'https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
  // Destination URL
    var url = "http://yoururl/upload.php";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    const fileTransfer: TransferObject = this.transfer.create();
   
    let loading = this.loading.create({
      content: 'Uploading...',
    });
    loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      loading.dismissAll()
      this.presentToast('Error while uploading file.');
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
        this._tokenService.put(url, this.form.value).subscribe(
          data =>      {
            data = JSON.parse(data['_body']);
            console.log("data:: ", data);
            this.user = Object.assign({}, this.user, data['data']);
            loading.dismiss();
            if (!this.password_show) {
              this.messages("Perfil actualizado")
            }else{
              this.messages("Contraseña actualizada")
            } 
            this.navCtrl.setRoot("PerfilPage")  
            //this.toastr.success('Perfil Actualizado!', 'Toastr fun!');
            //this.loading=false;
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
