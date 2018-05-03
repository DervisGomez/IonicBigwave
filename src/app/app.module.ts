import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { WishesPage } from '../pages/wishes/wishes';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login';
import { NearbyPage } from '../pages/nearby/nearby';
import { PerfilPage } from '../pages/perfil/perfil';
import { MessagesPage } from '../pages/messages/messages';
import { RegisterUserPage } from '../pages/register-user/register-user';
import { EditPerfilPage } from '../pages/edit-perfil/edit-perfil';
import { RecoverPasswordPage } from '../pages/recover-password/recover-password';
import { ListPerfilesPage } from '../pages/list-perfiles/list-perfiles';
import { ListCategoriesPage } from '../pages/list-categories/list-categories';
import { PymesPage } from '../pages/pymes/pymes';
import { IndependientsPage } from '../pages/independients/independients';
import { SellersPage } from '../pages/sellers/sellers';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { BigwaveProvider } from '../providers/bigwave/bigwave';

import { HttpModule } from '@angular/http';
import { Angular2TokenService,A2tUiModule } from 'angular2-token';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WishesPage,
    LoginPage,
    NearbyPage,
    PerfilPage,
    MessagesPage,
    RegisterUserPage,
    EditPerfilPage,
    RecoverPasswordPage,
    ListPerfilesPage,
    ListCategoriesPage,
    PymesPage,
    IndependientsPage,
    SellersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__bigwave',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),    
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    A2tUiModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WishesPage,
    LoginPage,
    NearbyPage,
    PerfilPage,
    MessagesPage,
    RegisterUserPage,
    EditPerfilPage,
    RecoverPasswordPage,
    ListPerfilesPage,
    ListCategoriesPage,
    PymesPage,
    IndependientsPage,
    SellersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    BigwaveProvider,
    GoogleMaps,
    Geolocation,
    File,
    Transfer,
    Camera,
    FilePath,
    Angular2TokenService
  ]
})
export class AppModule {}
