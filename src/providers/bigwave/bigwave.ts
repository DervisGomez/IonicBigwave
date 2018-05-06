import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token'
@Injectable()
export class BigwaveProvider {

  constructor(
    public http: HttpClient,
    private _tokenService: Angular2TokenService
   ) {

    console.log('Hello BigwaveProvider Provider');
  }

  pymes(currentHeaders: {'access-token': string, 'uid': string, 'client': string}): Observable<any>{
    let headers = new HttpHeaders({
    	'Content-Type': 'application/json;charset=utf-8',
    	'access-token': currentHeaders['access-token'],
    	'uid': currentHeaders.uid,
    	'client': currentHeaders.client
    });
      	
    console.log(currentHeaders)
  	return this.http.get(routes.pymes(), { headers: headers, observe: 'response' });
  }

  sellers(currentHeaders: {'access-token': string, 'uid': string, 'client': string}): Observable<any>{
    let headers = new HttpHeaders({
    	'Content-Type': 'application/json;charset=utf-8',
    	'access-token': currentHeaders['access-token'],
    	'uid': currentHeaders.uid,
    	'client': currentHeaders.client
    });
      	
    console.log(currentHeaders)
  	return this.http.get(routes.sellers(), { headers: headers, observe: 'response' });
  }

  independents(currentHeaders: {'access-token': string, 'uid': string, 'client': string}): Observable<any>{
     let headers = new HttpHeaders({
    	'Content-Type': 'application/json;charset=utf-8',
    	'access-token': currentHeaders['access-token'],
    	'uid': currentHeaders.uid,
    	'client': currentHeaders.client
    });
    
      	
    console.log(currentHeaders)
  	return this.http.get(routes.independents(), { headers: headers, observe: 'response' }); 	
  }

  allcategories(currentHeaders: {'access-token': string, 'uid': string, 'client': string}): Observable<any>{
    let headers = new HttpHeaders({
     'Content-Type': 'application/json;charset=utf-8',
     'access-token': currentHeaders['access-token'],
     'uid': currentHeaders.uid,
     'client': currentHeaders.client
   });
   
       
   console.log(currentHeaders)
   return this.http.get(routes.categories(), { headers: headers, observe: 'response' }); 	
 }
geololization(lat:string, lng:string, newCategories, q) : Observable<any>{
  let params = {
     q: q, 
    radio: 5,
   user: [
     lat,
     lng
    ],
    categories: newCategories
  }
console.log(params)
  return this._tokenService.post(routes.geolocation(), params).map(res => res);
  }
}
