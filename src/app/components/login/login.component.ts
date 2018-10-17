import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {};

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData)
      .subscribe(res => this.onLoginSuccess(res), err => console.log(err));
  }

  onLoginSuccess(res) {
    const jsonStr = JSON.stringify(res);
    const jsonData = JSON.parse(jsonStr);
    sessionStorage.setItem('token', jsonData.token);
    sessionStorage.setItem('role', jsonData.roles);
    this.router.navigate(['timetable']);
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }
}
