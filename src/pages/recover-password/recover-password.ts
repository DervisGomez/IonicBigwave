import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Angular2TokenService} from 'angular2-token';
import { ROOT } from '../../config/routes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the RecoverPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password.html',
})
export class RecoverPasswordPage {
	form: FormGroup;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public fb: FormBuilder,
  	private _tokenService: Angular2TokenService) {
  	this._tokenService.init({apiBase: ROOT});
    
    this.form = this.fb.group({
      email: ['', Validators.compose([
          Validators.required,
          Validators.email,
      ])]
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPasswordPage');
  }

}
