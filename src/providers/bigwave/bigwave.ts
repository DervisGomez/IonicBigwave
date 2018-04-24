import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class BigwaveProvider {

  constructor(public http: HttpClient) {
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

  categories(currentHeaders: {'access-token': string, 'uid': string, 'client': string}): Observable<any>{
    let headers = new HttpHeaders({
     'Content-Type': 'application/json;charset=utf-8',
     'access-token': currentHeaders['access-token'],
     'uid': currentHeaders.uid,
     'client': currentHeaders.client
   });
   
       
   console.log(currentHeaders)
   return this.http.get(routes.categories(), { headers: headers, observe: 'response' }); 	
 }
}
