import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ActionSheet, ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { GoogleMaps, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
import { icons, sucursales } from '../../config/marks/icons'
import { routes, ROOT } from '../../config/routes';
import { Angular2TokenService } from 'angular2-token';
import { BigwaveProvider } from '../../providers/bigwave/bigwave';

/**
 * Generated class for the NearbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
let infowindow: any;

@IonicPage()
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {
  detail: any;
  profile: any;
  sucursal: any;
  profiles: any;
  newcategories: any = [];
  categories: any;
  user: any;
  lat: any = 0;
  lng: any = 0;
  window: any = false;
  q: any = "";
  filter = {
    show: false,
    icon: "funnel"
  }
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public platform: Platform,
    public storage: Storage,
    public geo: Geolocation,
    private _tokenService: Angular2TokenService,
    public bigwaveProvider: BigwaveProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
    this._tokenService.init({ apiBase: ROOT });
    platform.ready().then(() => {

    });
    this.newcategories = [];
    this.sucursal = [];
  }

  ionViewDidLoad() {  	//this.loadMap();
    this.miPosition();
    this.getCategories();
    console.log('ionViewDidLoad NearbyPage');

  }
  getCategories() {
    this.storage.get('user').then((user) => {
      this.user = user;
      /*     if (this.user) { */
      this.storage.get('headers').then((data) => {
        let url = routes.categoriesFilter();
        this._tokenService.get(url, data).subscribe(
          response => {

            /*  let id = response['data'].id; */
            /*  this.user.id = id; */
            var token, uid, client;
            client = response['headers'].get('client');
            uid = response['headers'].get('uid');
            token = response['headers'].get('access-token');
            this.categories = JSON.parse(response['_body']);
            console.log(this.categories)
            /*        this.categories = this.categories; */
            for (var i in this.categories.data) {
              this.newcategories[i] = this.categories.data[i].id;
            }
            this.categories = this.categories.data;
            let header = {
              token: token,
              client: client,
              uid: uid
            }
            this.storage.set('headers', header);
          },
          error => {
            console.log(error);
          })

      })
      /*   } */
    })
  }
  getFilter(category) {
    var index = this.newcategories.indexOf(category);
    if (index > -1) {
      this.newcategories.splice(index, 1);
      this.bigwaveProvider.geololization(this.lat, this.lng, this.newcategories, this.q).subscribe(
        response => {
          console.log(response)
          this.sucursal = JSON.parse(response['_body']);
          console.log(this.sucursal)
          for (var i = 0; i < this.sucursal.length; i++) {
           let profiles = this.sucursal[i].profiles;
           for(var j = 0; j < profiles.length ; j++){
            profiles[j] = profiles[j];
            profiles[j] = profiles[j][0];
           }
            let sucursal = {
              latitude: this.sucursal[i].latitude,
              longitude: this.sucursal[i].longitude,
             profiles : profiles
            }
          this.sucursal[i] = sucursal;
          }
          console.log(this.sucursal)
          this.createmarkers();
        },
        error => {
          console.log(error);
        })
    } else {
      this.newcategories.push(category);
      this.bigwaveProvider.geololization(this.lat, this.lng, this.newcategories, this.q).subscribe(
        response => {
          console.log(response)
          this.sucursal = JSON.parse(response['_body']);
          console.log(this.sucursal)
          for (var i = 0; i < this.sucursal.length; i++) {
           let profiles = this.sucursal[i].profiles;
           for(var j = 0; j < profiles.length ; j++){
            profiles[j] = profiles[j];
            profiles[j] = profiles[j][0];
           }
            let sucursal = {
              latitude: this.sucursal[i].latitude,
              longitude: this.sucursal[i].longitude,
             profiles : profiles
            }
          this.sucursal[i] = sucursal;
          }
          console.log(this.sucursal)
          this.createmarkers();
        },
        error => {
          console.log(error);
        })
    }

  }
  onInput(search) {
    this.initMap(18);
    this.bigwaveProvider.geololization(this.lat, this.lng, this.newcategories, search).subscribe(
      response => {
        console.log(response)
        this.sucursal = JSON.parse(response['_body']);
        console.log(this.sucursal)
        for (var i = 0; i < this.sucursal.length; i++) {
         let profiles = this.sucursal[i].profiles;
         for(var j = 0; j < profiles.length ; j++){
          profiles[j] = profiles[j];
          profiles[j] = profiles[j][0];
         }
          let sucursal = {
            latitude: this.sucursal[i].latitude,
            longitude: this.sucursal[i].longitude,
           profiles : profiles
          }
        this.sucursal[i] = sucursal;
        }
        console.log(this.sucursal)
        this.createmarkers();
      },
      error => {
        console.log(error);
      })
  }
  showFilter() {
    this.filter.show = !this.filter.show;
    if (this.filter.show) {
      this.filter.icon = "close"
    } else {
      this.filter.icon = "funnel"
    }
  }

  miPosition() {
    this.geo.getCurrentPosition().then(pos => {
      this.lat = 11.68501858908447;
      this.lng = -70.17362594604492;
      this.initMap(18);
      //this.initMap(pos);            
    }).catch(err => {
      this.initMap(18);
      this.message("GPS no activado")
    });
  }

  initMap(ps) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: ps,
      center: { lat: this.lat, lng: this.lng }
    });
    this.window = false;
    this.directionsDisplay.setMap(this.map);
    this.createMarkerUser();
    /*  this.createmarkers(); */
    infowindow = new google.maps.InfoWindow();
    var prueba = this;
    this.map.addListener('click', e => {
      var coor = e.latLng + "";
      coor = coor.substring(1, coor.length - 1)
      var lat = coor.split(", ", 2)
      console.log("coordenadas: " + e.latLng);
      console.log("coordenadas: " + coor);
      console.log(+lat[0]);
      console.log(+lat[1]);
      prueba.lat = +lat[0];
      prueba.lng = +lat[1];
      this.initMap(18);
      this.bigwaveProvider.geololization(this.lat, this.lng, this.newcategories, this.q).subscribe(
        response => {
          console.log(response)
          this.sucursal = JSON.parse(response['_body']);
          console.log(this.sucursal)
          for (var i = 0; i < this.sucursal.length; i++) {
           let profiles = this.sucursal[i].profiles;
           for(var j = 0; j < profiles.length ; j++){
            profiles[j] = profiles[j];
            profiles[j] = profiles[j][0];
           }
            let sucursal = {
              latitude: this.sucursal[i].latitude,
              longitude: this.sucursal[i].longitude,
             profiles : profiles
            }
          this.sucursal[i] = sucursal;
          }
          console.log(this.sucursal)
          this.createmarkers();
        })
    });
  }

  public newMap() {
    console.log("hola")
  }
  createMarker() {
    if (this.lat == 0 && this.lng == 0) {
      //this.message("No se pudo establecer la ubicacion");
    } else {

      var place = { lat: this.lat, lng: this.lng };
      var marker = new google.maps.Marker({
        map: this.map,
        position: place,
        icon: icons.emerald.icon,

      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent("hola mundo");
        infowindow.open(this.map, this);

      });

    }

  }
  createMarkerUser() {
    if (this.lat == 0 && this.lng == 0) {
      //this.message("No se pudo establecer la ubicacion");
    } else {

      var place = { lat: this.lat, lng: this.lng };
      var marker = new google.maps.Marker({
        map: this.map,
        position: place,
        icon: icons.kenny.icon,
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent("Estas Aqui");
        infowindow.open(this.map, this);

      });

    }

  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  createmarkers() {
    this.sucursal.forEach((sucursal) => {
      var profiles = sucursal.profiles;
      profiles.forEach((profile) => {
        console.log("marca", sucursal.latitude, sucursal.longitude)
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(sucursal.latitude, sucursal.longitude),
          icon: icons[profile.type_profile].icon,
          map: this.map
        });

        google.maps.event.addListener(marker, 'click', () => {
          this.info(sucursal.profiles);
        });
      });
      });

    }

info(sucursal){
    this.window = true;
    console.log(sucursal)
    this.detail = sucursal;

      }
closeinfo(){
        this.window = false;
      }
  message(message){
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });
        toast.present()
      }

  loadMap(){
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: 43.0741904, // default location
              lng: -89.3809802 // default location
            },
            zoom: 18,
            tilt: 30
          }
        };
        this.message("ok2: ");
        this.map = GoogleMaps.create('map', mapOptions);
        this.message("ok3: ");
        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            // Now you can use all methods safely.
            this.getPosition();
            this.message("bien");
          })
          .catch(error => {
            this.message(error);
            console.log(error);
          });
        this.message("ok4: ");

      }

 getPosition(): void {
        this.map.getMyLocation()
          .then(response => {
            this.map.moveCamera({
              target: response.latLng
            });
            this.map.addMarker({
              title: 'My Position',
              icon: 'blue',
              animation: 'DROP',
              position: response.latLng
            });
          })
          .catch(error => {
            console.log(error);
          });
      }


 

}
