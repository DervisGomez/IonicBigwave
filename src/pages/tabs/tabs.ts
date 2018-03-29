import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'ExplorePage';
  tab3Root = 'NearbyPage';
  tab4Root = 'MessagesPage';
  tab5Root = 'PerfilPage';

  constructor() {

  }
}
