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

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    const body = new HttpParams()
    .set('username', user.email)
    .set('password', user.password);

  return this.http.post('/login', body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getJsessionId() {
    sessionStorage.getItem('token');
  }
}
