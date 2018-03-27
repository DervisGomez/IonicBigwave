import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { routes } from '../../config/routes';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  login(usuario: {email: string,clave: string}): Observable <any> {
    let user = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(routes.login(usuario.email, usuario.clave), user, { headers: headers });
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
	console.log("http://someUrl?" + Params);

    return this.http.post(routes.registerUser(), user, { headers: headers, params: Params });
  }
}
