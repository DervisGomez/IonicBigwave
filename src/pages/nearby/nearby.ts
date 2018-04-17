import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
/**
 * Generated class for the NearbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google;
 let infowindow: any;
 let map: any;

@IonicPage()
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {

  lat: any;
  lng: any;


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public platform: Platform,
  	public geo: Geolocation) {

  	platform.ready().then(() => {
    	this.geo.getCurrentPosition().then( pos => {
	      this.lat = pos.coords.latitude;
	      this.lng = pos.coords.longitude;
	      console.log(this.lat,this.lng)
	      //this.initMap(pos);
	      this.loadMap();     
	    }).catch( err => console.log(err));
	});
  }

  ionViewDidLoad() {  	//this.loadMap();
  	
    console.log('ionViewDidLoad NearbyPage');
    
  }

  /*loadMap() {
	  this.map = new GoogleMap('map');
	  this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
	  	alert('Map is ready!')
	    console.log('Map is ready!');
	  });
	}*/

  initMap(location) {
  	console.log(location);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: {lat: this.lat, lng: this.lng}
    });
    this.directionsDisplay.setMap(this.map);
    //var myplace = {lat: this.lat, lng: this.lng};
    //this.createMarker(location)
  }

  createMarker(place) {
	  var placeLoc = place.geometry.location;
	  var marker = new google.maps.Marker({
	    map: map,
	    position: placeLoc
	  });

	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.setContent(place.name);
	    infowindow.open(map, this);
	  });
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

  this.map = GoogleMaps.create('map', mapOptions);
  // Wait the MAP_READY before using any methods.
  this.map.one(GoogleMapsEvent.MAP_READY)
  .then(() => {
    // Now you can use all methods safely.
    this.getPosition();
  })
  .catch(error =>{
    console.log(error);
  });
}

 getPosition(): void{
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
    .catch(error =>{
      console.log(error);
    });
  }

}
