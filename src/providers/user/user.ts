import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  login(usuario: {email: string,clave: string}): Observable<any>{
    let user = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(headers)

    return this.http.post(routes.login(usuario.email, usuario.clave), user, { headers: headers, observe: 'response' });
  }

  register(usuario: { email: string, name: string, nickname: string, password: string, password_confirm: string }): Observable<any> {
    let user = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
  	let Params = new HttpParams();

  	Params = Params.append('email', usuario.email);
  	Params = Params.append('name', usuario.name);
  	Params = Params.append('nickname', usuario.nickname);
  	Params = Params.append('password', usuario.password);
  	Params = Params.append('password_confirm', usuario.password_confirm);
	  console.log("http://someUrll?" + Params);
	  
    return this.http.post(routes.registerUser2(), user, { headers: headers, params: Params });
  }

  edit(usuario: { email?: string, name?: string, nickname?: string, password?: string, password_confirm?: string },currentHeaders: {'access-token': string, 'uid': string, 'client': string}): Observable<any> {
    let user = JSON.stringify(usuario);
    let headers2 = {
      'Content-Type': 'application/json;charset=utf-8',
      'access-token': currentHeaders['access-token'],
      'uid': currentHeaders.uid,
      'client': currentHeaders.client
    };
    
    let headers =new HttpHeaders(headers2);
    //let headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
  	let Params = new HttpParams();


  	//Params = Params.append('email', usuario.email);
  	//Params = Params.append('name', usuario.name);
  	Params = Params.append('nickname', usuario.nickname);
  	Params = Params.append('current_password', usuario.password);
    //Params = Params.append('password', usuario.password);
  	//Params = Params.append('password_confirm', usuario.password_confirm);
	  
    return this.http.put(routes.registerUser(), user, { headers: headers, params: Params });
  }

  perfil(currentHeaders: {'access-token': string, 'uid': string, 'client': string}): Observable<any>{
    
    let headers2 = {
    	'Content-Type': 'application/json;charset=utf-8',
    	'access-token': currentHeaders['access-token'],
    	'uid': currentHeaders.uid,
    	'client': currentHeaders.client
    };

    let headers =new HttpHeaders(headers2);
    console.log(headers)
  	return this.http.get(routes.perfil(), { headers: headers, observe: 'response' });
  }
}
