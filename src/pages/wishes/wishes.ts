import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

/**
 * Generated class for the WishesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wishes',
  templateUrl: 'wishes.html',
})
export class WishesPage {
	user: any;

  constructor(public navCtrl: NavController) {
  }
}
