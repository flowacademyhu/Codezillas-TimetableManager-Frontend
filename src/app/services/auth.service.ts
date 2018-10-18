import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = '/registration';
  private loginUrl = '/login';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(newUser) {
    return this.http.post<any>(this.registerUrl, newUser);
  }

  loginUser(user) {
    const body = new HttpParams()
    .set('username', user.email)
    .set('password', user.password);

  return this.http.post(this.loginUrl, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  loggedIn() {
    return sessionStorage.getItem('token') ? true : false;
  }

  getJsessionId() {
    return window.localStorage.getItem('token');
  }
}
