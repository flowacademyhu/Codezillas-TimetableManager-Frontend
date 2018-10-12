import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerUserData = {} as User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    if (this.registerUserData.password.length > 5 && this.registerUserData.password === this.registerUserData.confirmPassword) {
      this.authService.registerUser(this.registerUserData)
        .subscribe(res => this.onRegistrationSuccess(), err => this.onError(err));
    }
  }

  onRegistrationSuccess() {
    this.router.navigate(['timetable']);
  }

  onError(err) {
    alert(err.statusText);
  }

}
